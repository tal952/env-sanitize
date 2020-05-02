import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asLowerCase", () => {
  it("valueIsValidOption", () => {
    const [key, value] = generateKeyAndValue("UPPER");
    process.env[key] = value;
    expect(env(key, (x) => x.asLowerCase())).toBe("upper");
  });
});
