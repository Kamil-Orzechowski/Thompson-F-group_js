import { BinaryTree, parseToTree } from "./trees.mjs";
import { FGroupElement } from "./group.mjs";

// Some test cases

const tree1 = parseToTree('a(b(c(df)))');
const tree2 = parseToTree('a(b((cd)f))');
const subdiv1 = tree1.getIntervalSubdivision();
const subdiv2 = tree2.getIntervalSubdivision();
const zip = (arr1, arr2) => arr1.map((v, i) => [v, arr2[i]]);

const element = new FGroupElement(zip(subdiv1, subdiv2));

console.log((element.vertices));
console.log((element.domainSubdivision));
console.log((element.imageSubdivision));
console.log((element.slopes));