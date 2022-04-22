function checkSpam(str) {
  const FIRST_CONST = '1XBET';
  const SECOND_CONST = 'XXX';

  let upperCaseStr = str.toUpperCase();

  return upperCaseStr.includes(FIRST_CONST) || upperCaseStr.includes(SECOND_CONST);
}
