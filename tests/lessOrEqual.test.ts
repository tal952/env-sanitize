import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("LessOrEqual", () => {
  it("Equal", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.lessOrEqual(5))).toBe(5);
  });

  it("Less", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.lessOrEqual(6))).toBe(5);
  });

  it("NotLessOrEqual", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(() => env(key, (x) => x.lessOrEqual(2))).toThrow();
  });
});
