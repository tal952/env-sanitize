import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asRegex", () => {
  it("ValidAsRegex", () => {
    const [key, value] = generateKeyAndValue("123");
    process.env[key] = value;
    expect(env(key, (x) => x.asRegex(/^[0-9]*$/g))).toBe(value);
  });

  it("NotValidAsRegex_throw", () => {
    const [key, value] = generateKeyAndValue("12A");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asRegex(/^[0-9]*$/g))).toThrow();
  });
});
