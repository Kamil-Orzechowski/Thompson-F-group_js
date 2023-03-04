function parseDyadic(x) {
  if (Number.isInteger(x)) {
    return [x, 0];
  }
  let numerator = x;
  let denominatorExp = 0;
  while (!Number.isInteger(numerator)) {
    numerator *= 2;
    denominatorExp += 1;
  }
  return [numerator, denominatorExp];
}

function writeDyadic(x) {
  const data = parseDyadic(x);
  return data[1] == 0 ? `${data[0]}` : `${data[0]}/${2 ** data[1]}`;
}

export { parseDyadic, writeDyadic };
