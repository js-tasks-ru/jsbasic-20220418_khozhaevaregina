function camelize(str) {
  return str.split('-').map((word, index) => {
    return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
  }).join('');
}
