import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("less", () => {
  it("validLess", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.less(6))).toBe(5);
  });

  it("IntLess_throw", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(() => env(key, (x) => x.less(2))).toThrow();
  });
});
