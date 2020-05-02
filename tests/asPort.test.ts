import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asPort", () => {
  it("validPort", () => {
    const [key, value] = generateKeyAndValue("443");
    process.env[key] = value;
    expect(env(key, (x) => x.asPort())).toBe(443);
  });

  it("notValidPort_throw", () => {
    const [key, value] = generateKeyAndValue("407897987");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asPort())).toThrow();
  });
});
