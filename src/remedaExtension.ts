import * as R from "remeda";

/**
 * Creates a new object by picking only those keys from a source object for
 * which the value and/or the key satisfy some condition.
 */
const pickBy = <K extends string, V>(f: (value: V, key: K) => boolean) => (
  o: Record<K, V>
): Record<K, V> => {
  return R.pick(
    o,
    (Object.keys(o) as K[]).filter((k) => f(o[k], k))
  );
};

/**
 * All functions to compose must be ot type (T) => T.
 */
const composeSimple = <T>(...fns: ((v: T) => T)[]) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    (value) => value
  );

export const RExt = {
  pickBy,
  compose: composeSimple,
};
