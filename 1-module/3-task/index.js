function ucFirst(str) {
  let result;

  if (str.length > 0) {
    return result = str[0].toUpperCase() + str.slice(1);
  } else {
    return str;
  }
}
