import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asJson", () => {
  it("validJson", () => {
    const [key, value] = generateKeyAndValue('{"foo":5}');
    process.env[key] = value;
    expect(env(key, (x) => x.asJson())).toEqual({ foo: 5 });
  });

  it("notValidJson_throw", () => {
    const [key, value] = generateKeyAndValue("foo");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asJson())).toThrow();
  });
});
