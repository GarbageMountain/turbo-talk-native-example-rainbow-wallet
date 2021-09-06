export function neverInProd(val: boolean) {
  return __DEV__ ? val : false;
}
