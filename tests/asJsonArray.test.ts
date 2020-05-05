import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("asJsonArray", () => {
  it("validJsonArray", () => {
    const [key, value] = generateKeyAndValue('[{"foo":5}]');
    process.env[key] = value;
    expect(env(key, (x) => x.asJsonArray())).toEqual([{ foo: 5 }]);
  });

  it("notValidJsonArray_throw", () => {
    const [key, value] = generateKeyAndValue("{}");
    process.env[key] = value;
    expect(() => env(key, (x) => x.asJsonArray())).toThrow();
  });
});
