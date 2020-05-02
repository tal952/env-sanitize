import env from "../src";
import { generateKeyAndValue } from "./utils/generateKeyAndValue";

describe("assert", () => {
  it("EnvPassAssert", () => {
    const [key, value] = generateKeyAndValue();
    process.env[key] = value;
    expect(env(key, (x) => x.assert((v) => v === value))).toBe(value);
  });

  it("EnvNotPassAssert_Throw", () => {
    const [key, value] = generateKeyAndValue();
    process.env[key] = value;
    expect(() =>
      env(key, (x) =>
        x.assert(
          (v) => v === "foo",
          (v) => `${v} is not foo.`
        )
      )
    ).toThrow(new Error(`${value} is not foo.`));

    expect(() =>
      env(key, (x) => x.assert((v) => v === "foo", `not foo.`))
    ).toThrow(new Error(`not foo.`));

    expect(() =>
      env(key, (x) =>
        x.assert(
          (v) => v === "foo",
          (v, k) => `Key:'${k}' not foo.`
        )
      )
    ).toThrow(new Error(`Key:'${key}' not foo.`));
  });
});
