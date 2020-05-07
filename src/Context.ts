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
      () => `The key "${this.key}" must be one of: ${validValues}`
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
    const int = parseInt(this.value.toString(), 10);

    return this.assert(
      (v) => !isNaN(int) && v.toString().indexOf(".") === -1,
      `The key "${this.key}" must be a valid integer`
    ).transform(() => int);
  }

  asIntInclusiveBetween(start: number, end: number) {
    return this.asInt().assert(
      (v) => v >= start && v <= end,
      `The key "${this.key}" must be between ${start} and ${end}`
    );
  }

  asFloat() {
    const float = parseFloat(this.value.toString());

    return this.assert(
      () => !isNaN(float),
      `The key "${this.key}" must be a valid float`
    ).transform(() => float);
  }

  asFloatInclusiveBetween(start: number, end: number) {
    return this.asFloat().assert(
      (v) => v >= start && v <= end,
      `The key "${this.key}" must be between ${start} and ${end}`
    );
  }

  asJson() {
    return this.transform((v) => {
      try {
        return JSON.parse(v.toString());
      } catch (e) {
        return this.assert(
          () => false,
          `The key "${this.key}" must be a valid JSON`
        );
      }
    });
  }

  asJsonArray(): Context<[any]> {
    return this.asJson().assert(
      (v) => Array.isArray(v),
      `The key "${this.key}" must be a valid JSON array`
    );
  }

  asPort() {
    return this.asIntInclusiveBetween(0, 65535);
  }
}
