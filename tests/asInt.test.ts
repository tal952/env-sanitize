import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asInt", () => {
  it("validInt", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.asInt())).toBe(5);
  });

  it("notValidInt_throw", () => {
    const [key, value] = generateKeyAndValue("foo");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asInt())).toThrow();
  });

  it("isAFloat_throw", () => {
    const [key, value] = generateKeyAndValue("1.1");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asInt())).toThrow();
  });
});
