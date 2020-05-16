import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("greaterOrEqual", () => {
  it("Equal", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.greaterOrEqual(5))).toBe(5);
  });

  it("Greater", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.greaterOrEqual(3))).toBe(5);
  });

  it("NotGreaterOrEqual", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(() => env(key, (x) => x.greaterOrEqual(9))).toThrow();
  });
});
