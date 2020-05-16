export default class Context<V> {
  constructor(private key: string, private value: V) {}

  assert(
    assertFunc: (value: V) => boolean,
    message:
      | string
      | ((
          value?: V,
          key?: string
        ) => string) = `Assert failed for key: '${this.key}' and value:${this.value}`
  ) {
    if (assertFunc(this.value)) return this;

    throw new Error(
      message instanceof Function ? message(this.value, this.key) : message
    );
  }

  transform<R>(getValue: (value: V) => R) {
    const _this = (this as unknown) as Context<R>;
    _this.value = getValue(this.value);
    return _this;
  }

  asEnum(validValues: V[]) {
    return this.assert(
      (v) => validValues.includes(v),
      () => `The key "${this.key}" most be one of: ${validValues}`
    );
  }

  asRegex(regex: RegExp) {
    return this.assert(
      (v) => regex.test(v.toString()),
      () => `The key "${this.key}" most match the regex: ${regex}`
    );
  }

  asLowerCase() {
    return this.transform((v) => v.toString().toLowerCase());
  }

  asUpperCase() {
    return this.transform((v) => v.toString().toUpperCase());
  }

  asBoolean() {
    return this.asLowerCase()
      .asEnum(["false", "0", "true", "1"])
      .transform((v) => v === "true" || v === "1");
  }

  asInt() {
    return this.transform((v) => parseFloat(v.toString())).assert(
      (v) => Number.isInteger(v),
      `The key "${this.key}" most be a valid integer`
    );
  }

  asFloat() {
    return this.transform((v) => parseFloat(v.toString())).assert(
      (v) => !isNaN(v),
      `The key "${this.key}" most be a valid float`
    );
  }

  greater(n: number) {
    return (typeof this.value == "number" ? this : this.asFloat()).assert(
      (v) => v > n,
      `The key "${this.key}" most be greater then ${n}`
    );
  }

  greaterOrEqual(n: number) {
    return (typeof this.value == "number" ? this : this.asFloat()).assert(
      (v) => v >= n,
      `The key "${this.key}" most be greater than or equal to ${n}`
    );
  }

  less(n: number) {
    return (typeof this.value == "number" ? this : this.asFloat()).assert(
      (v) => v < n,
      `The key "${this.key}" most be less then ${n}`
    );
  }

  lessOrEqual(n: number) {
    return (typeof this.value == "number" ? this : this.asFloat()).assert(
      (v) => v <= n,
      `The key "${this.key}" most be less than or equal to ${n}`
    );
  }

  asJson() {
    return this.transform((v) => {
      try {
        return JSON.parse(v.toString());
      } catch (e) {
        return this.assert(
          () => false,
          `The key "${this.key}" most be a valid JSON`
        );
      }
    });
  }

  asJsonArray(): Context<[any]> {
    return this.asJson().assert(
      (v) => Array.isArray(v),
      `The key "${this.key}" most be a valid JSON array`
    );
  }

  asPort() {
    return this.asInt().greaterOrEqual(0).lessOrEqual(65535);
  }
}
