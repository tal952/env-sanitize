import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asFloatInclusiveBetween", () => {
  it("validFloatInclusiveBetween", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(env(key, (x) => x.asFloatInclusiveBetween(5.3, 5.9))).toBe(5.4);
  });

  it("FloatNotInclusiveBetween", () => {
    const [key, value] = generateKeyAndValue("5.4");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asIntInclusiveBetween(1.2, 3.4))).toThrow();
  });
});
