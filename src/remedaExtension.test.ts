import { RExt } from "./remedaExtension";

test("pickBy", () => {
  expect(
    RExt.pickBy<string, number>((value) => value > 10)({ a: 10, b: 20 })
  ).toStrictEqual({ b: 20 });
});
