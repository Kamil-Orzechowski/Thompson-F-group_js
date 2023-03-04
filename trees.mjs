class BinaryTree {
  constructor(leftSubtree, rightSubtree) {
    this.leftSubtree = leftSubtree;
    this.rightSubtree = rightSubtree;
    this.binaryCode = "";
    this.updateSubtrees();
  }
  updateSubtrees() {
    const subtrees = [this.leftSubtree, this.rightSubtree];
    for (let i = 0; i < 2; i++) {
      if (subtrees[i]) {
        subtrees[i].parent = this;
        for (const node of subtrees[i].getNodes()) {
          node.binaryCode = `${i}` + node.binaryCode;
        }
      }
    }
  }
  getNodes() {
    return [this]
      .concat(this.leftSubtree ? this.leftSubtree.getNodes() : [])
      .concat(this.rightSubtree ? this.rightSubtree.getNodes() : []);
  }
  isLeaf() {
    return !(this.leftSubtree || this.rightSubtree);
  }
  getLeaves() {
    return this.getNodes().filter((node) => node.isLeaf());
  }
  getIntervalSubdivision() {
    return this.getLeaves()
      .map((leaf) => leaf.binaryCode)
      .map((code) => parseInt(code, 2) / 2 ** code.length)
      .concat([1.0]);
  }
}

function removeChildren(node) {
  node.leftSubtree = node.rightSubtree = null;
}

function append(leaf, tree) {
  for (const node of tree.getNodes()) {
    node.binaryCode = leaf.binaryCode + node.binaryCode;
  }
  tree.parent = leaf.parent;
  if (leaf.binaryCode.endsWith("0")) {
    tree.parent.leftSubtree = tree;
  }
  if (leaf.binaryCode.endsWith("1")) {
    tree.parent.rightSubtree = tree;
  }
}

function createBalancedTree(depth) {
  if (depth === 0) {
    return new BinaryTree(null, null);
  }
  return new BinaryTree(
    createBalancedTree(depth - 1),
    createBalancedTree(depth - 1)
  );
}

export { BinaryTree, append, createBalancedTree, removeChildren };

/* let test = createBalancedTree(2);
console.log(test.getNodes().map((node) => node.binaryCode));
console.log(test.getLeaves().map((leaf) => leaf.binaryCode));

append(test.getLeaves()[1], createBalancedTree(3));
console.log("After appending");
console.log(test.getNodes().map((node) => node.binaryCode));
console.log(test.getLeaves().map((leaf) => leaf.binaryCode)); */

/* export function parseToTree(expr) {
    if (expr.length == 1) {
        return new BinaryTree(null, null);
    }
    let leftSubexpr, rightSubexpr, rightStartIndex;
    if (expr[0] != '(') {
        leftSubexpr = expr[0];
        rightStartIndex = 1;
    } else {
        leftSubexpr = '';
        let i = 1;
        for (let parenthesesDiff = 1, char; ;
            leftSubexpr += char, i++) {
            char = expr[i];
            if (char == '(') {
                parenthesesDiff++;
            }
            if (char == ')') {
                parenthesesDiff--;
            }
            if (parenthesesDiff == 0) {
                break;
            }
        }
        rightStartIndex = i + 1;
    }
    rightSubexpr = expr[rightStartIndex] == '(' ? expr.substring(rightStartIndex + 1, expr.length - 1)
        : expr[rightStartIndex];

    return new BinaryTree(parseToTree(leftSubexpr), parseToTree(rightSubexpr));

} */
