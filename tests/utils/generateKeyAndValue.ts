let counter = 0;

export function generateKeyAndValue(): [string, string];
export function generateKeyAndValue<V>(value?: V): [string, V | string];
export function generateKeyAndValue<V>(value?: V): [string, V | string] {
  return ["key" + ++counter, value ?? "value" + counter];
}
