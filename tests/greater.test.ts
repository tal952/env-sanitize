import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("greater", () => {
  it("validGreater", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(env(key, (x) => x.greater(1.2))).toBe(5.4);
  });

  it("FloatNotGreater", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(() => env(key, (x) => x.greater(9))).toThrow();
  });
});
