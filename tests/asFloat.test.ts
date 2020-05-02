import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asFloat", () => {
  it("validFloat", () => {
    const [key, value] = generateKeyAndValue("5.5");
    process.env[key] = value;
    expect(env(key, (x) => x.asFloat())).toBe(5.5);
  });

  it("notValidFloat_throw", () => {
    const [key, value] = generateKeyAndValue("foo");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asFloat())).toThrow();
  });
});
