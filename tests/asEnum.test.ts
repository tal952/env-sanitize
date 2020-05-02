import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asEnum", () => {
  it("valueIsValidOption", () => {
    const [key, value] = generateKeyAndValue();
    process.env[key] = value;
    expect(env(key, (x) => x.asEnum(["foo", "boo", value]))).toBe(value);
  });

  it("valueIsNotValidOption_throw", () => {
    const [key, value] = generateKeyAndValue();
    process.env[key] = value;
    expect(() => env(key, (x) => x.asEnum(["foo", "boo"]))).toThrow();
  });
});
