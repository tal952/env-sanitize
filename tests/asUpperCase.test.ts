import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asUpperCase", () => {
  it("valueIsValidOption", () => {
    const [key, value] = generateKeyAndValue("lower");
    process.env[key] = value;
    expect(env(key, (x) => x.asUpperCase())).toBe("LOWER");
  });
});
