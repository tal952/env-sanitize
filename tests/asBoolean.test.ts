import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asBoolean", () => {
  it("validBoolean", () => {
    const [key, value] = generateKeyAndValue("true");
    process.env[key] = value;
    expect(env(key, (x) => x.asBoolean())).toBe(true);
  });

  it("notValidBoolean_throw", () => {
    const [key, value] = generateKeyAndValue("foo");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asBoolean())).toThrow();
  });
});
