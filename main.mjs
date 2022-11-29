import { BinaryTree, parseToTree } from "./trees.mjs";
import { FGroupElement } from "./group.mjs";

const tree1 = parseToTree('(a(bc))d');
const tree2 = parseToTree('((ab)c)d');
const subdiv1 = parseToTree('(a(bc))d').getIntervalSubdivision();
const subdiv2 = parseToTree('((ab)c)d').getIntervalSubdivision();
const zip = (arr1, arr2) => arr1.map((v, i) => [v, arr2[i]]);

const element = new FGroupElement(zip(subdiv1, subdiv2));

console.log((element.vertices));
console.log((element.domainSubdivision));
console.log((element.imageSubdivision));
console.log((element.getSlopes()));