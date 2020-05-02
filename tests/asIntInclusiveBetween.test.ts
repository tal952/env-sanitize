import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asIntInclusiveBetween", () => {
  it("validIntInclusiveBetween", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(env(key, (x) => x.asIntInclusiveBetween(2, 7))).toBe(5);
  });

  it("IntNotInclusiveBetween_throw", () => {
    const [key, value] = generateKeyAndValue("5");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asIntInclusiveBetween(1, 3))).toThrow();
  });
});
