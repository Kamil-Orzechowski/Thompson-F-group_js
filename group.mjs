import { parseDyadic } from "./fraction-converter.mjs";
import {
  BinaryTree,
  append,
  createBalancedTree,
  removeChildren,
} from "./trees.mjs";

class FGroupElement {
  constructor(points) {
    const slopes = getSlopes(points);
    const predicate = (item, index) =>
      index == 0 ||
      index == points.length - 1 ||
      slopes[index - 1] != slopes[index];

    this.vertices = points.filter(predicate);
    this.slopes = slopes.filter(predicate);
    this.domainSubdivision = this.vertices.map((v) => v[0]);
    this.imageSubdivision = this.vertices.map((v) => v[1]);
  }
  apply(number) {
    let i = 0;
    while (this.domainSubdivision[i + 1] < number) {
      i++;
    }
    return (
      this.imageSubdivision[i] +
      (number - this.domainSubdivision[i]) * this.slopes[i]
    );
  }
}

function getSlopes(points) {
  let slopes = [];
  for (let i = 0; i <= points.length - 2; i++) {
    slopes.push(
      (points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0])
    );
  }
  return slopes;
}

const zip = (arr1, arr2) => arr1.map((v, i) => [v, arr2[i]]);

function inverse(groupElement) {
  return new FGroupElement(
    zip(groupElement.imageSubdivision, groupElement.domainSubdivision)
  );
}

function compose(element1, element2) {
  const element2Inverse = inverse(element2);
  const preimages = element1.domainSubdivision.map((x) =>
    element2Inverse.apply(x)
  );
  const newDomSubdiv = [
    ...new Set(
      element2.domainSubdivision.concat(preimages).sort((a, b) => a - b)
    ),
  ];
  return new FGroupElement(
    newDomSubdiv.map((x) => [x, element1.apply(element2.apply(x))])
  );
}

const generators = {
  a: new FGroupElement([
    [0.0, 0.0],
    [0.25, 0.5],
    [0.5, 0.75],
    [1.0, 1.0],
  ]),
  b: new FGroupElement([
    [0.0, 0.0],
    [0.5, 0.5],
    [0.625, 0.75],
    [0.75, 0.875],
    [1.0, 1.0],
  ]),
};
generators["a^{-1}"] = inverse(generators.a);
generators["b^{-1}"] = inverse(generators.b);

const identity = new FGroupElement([
  [0.0, 0.0],
  [1.0, 1.0],
]);

function power(element, exponent) {
  if (exponent == 0) {
    return identity;
  }
  let arr;
  if (exponent > 0) {
    arr = Array(exponent).fill(element);
  } else {
    arr = Array(-exponent).fill(inverse(element));
  }
  return arr.reduce(compose);
}

function getElementFromWord(string) {
  const re = /(?<letter>[ab])(?:\^\{(?<exponent>-?[1-9]\d*)\})?/g;
  const matches = [...string.matchAll(re)];
  const word = matches.map((x) => [
    generators[x.groups.letter],
    x.groups.exponent ? parseInt(x.groups.exponent) : 1,
  ]);
  return word.map((arr) => power(arr[0], arr[1])).reduce(compose, identity);
}

function getVertices(word) {
  return getElementFromWord(word).vertices;
}

function getTreePair(groupElement) {
  const subdivisions = [
    groupElement.domainSubdivision,
    groupElement.imageSubdivision,
  ];
  const depths = subdivisions.map((list) =>
    Math.max(...list.map((x) => parseDyadic(x)[1]))
  );
  const trees = depths.map(createBalancedTree);
  const leafLists = trees.map((t) => t.getLeaves());
  const blowupExponents = groupElement.slopes.map(
    (x) => Math.log2(x) + depths[1] - depths[0]
  );
  const blowup = (i, j) => {
    const start = subdivisions[i][j] * 2 ** depths[i];
    const stop = subdivisions[i][j + 1] * 2 ** depths[i];
    for (let k = start; k < stop; k++) {
      append(leafLists[i][k], createBalancedTree(Math.abs(blowupExponents[j])));
    }
  };
  for (let j = 0; j < blowupExponents.length; j++) {
    if (blowupExponents[j] > 0) {
      blowup(0, j);
    }
    if (blowupExponents[j] < 0) {
      blowup(1, j);
    }
  }
  if (trees[0].getNodes().length > 1) {
    let reductionDone;
    do {
      reductionDone = false;
      const domainLeaves = trees[0].getLeaves();
      const imageLeaves = trees[1].getLeaves();
      let i = 0;
      while (i < domainLeaves.length - 1) {
        const domainParent = domainLeaves[i].parent;
        const imageParent = imageLeaves[i].parent;
        if (
          domainParent.rightSubtree === domainLeaves[i + 1] &&
          imageParent.rightSubtree === imageLeaves[i + 1]
        ) {
          removeChildren(domainParent);
          removeChildren(imageParent);
          reductionDone = true;
          i += 2;
        } else i += 1;
      }
    } while (reductionDone);
  }
  return trees;
}

export { getVertices };

/* const testElement = generators.a;
const treePair = getTreePair(testElement);
const domainLeaves = treePair[0].getLeaves().map((leaf) => leaf.binaryCode);
const imageLeaves = treePair[1].getLeaves().map((leaf) => leaf.binaryCode);
console.log(domainLeaves);
console.log(imageLeaves); */
