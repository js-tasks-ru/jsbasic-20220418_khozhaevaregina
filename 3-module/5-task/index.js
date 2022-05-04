function getMinMax(str) {
  const result = {
    min: null,
    max: null
  };

  const arrayOfNums = str.split(' ').map((item) => {
    return parseFloat(item);
  }).filter(num => isFinite(num));

  result.max = Math.max(...arrayOfNums);
  result.min = Math.min(...arrayOfNums);

  return result;
}
