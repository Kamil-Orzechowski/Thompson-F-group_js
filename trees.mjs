export class BinaryTree {
    constructor(leftSubtree, rightSubtree) {
        this.leftSubtree = leftSubtree;
        this.rightSubtree = rightSubtree;
        this.binaryCode = '';
        this.nodes = [this].concat(this.leftSubtree ? this.leftSubtree.nodes : [])
            .concat(this.rightSubtree ? this.rightSubtree.nodes : []);
        this.updateLeftCodes();
        this.updateRightCodes();
    }
    updateLeftCodes() {
        if (this.leftSubtree) {
            for (const node of this.leftSubtree.nodes) {
                node.binaryCode = this.binaryCode + '0' + node.binaryCode;
            }
        }
    }
    updateRightCodes() {
        if (this.rightSubtree) {
            for (const node of this.rightSubtree.nodes) {
                node.binaryCode = this.binaryCode + '1' + node.binaryCode;
            }
        }
    }
    isLeaf() {
        return !(this.leftSubtree || this.rightSubtree);
    }
    getLeaves() {
        return this.nodes.filter(node => node.isLeaf());
    }
    getIntervalSubdivision() {
        return this.getLeaves().map(leaf => leaf.binaryCode)
            .map(code => parseInt(code, 2) / 2 ** code.length).concat([1.0]);
    }
}

export function parseToTree(expr) {
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

}