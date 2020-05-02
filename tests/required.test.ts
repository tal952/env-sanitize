import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("required", () => {
  it("EnvDoesNotExists_Throw", () => {
    const [key] = generateKeyAndValue();
    expect(() => env(key)).toThrow();
  });

  it("EnvDoesExists", () => {
    const [key, value] = generateKeyAndValue();
    process.env[key] = value;
    expect(env(key)).toBe(value);
  });

  it("EnvDoesNotExists_ReturnDefault", () => {
    const [key, value] = generateKeyAndValue();
    expect(env(key, value)).toBe(value);
  });

  it("EnvDoesNotExists_ReturnDefaultFunction", () => {
    const [key, value] = generateKeyAndValue();
    expect(env(key, () => value)).toBe(value);
  });

  it("EnvDoesNotExistsAndDefaultFunctionGetParameter_Throw", () => {
    const [key, value] = generateKeyAndValue();
    expect(() => env(key, (x) => x.asBoolean())).toThrow();
  });
});
