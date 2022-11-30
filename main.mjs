import { BinaryTree, parseToTree } from "./trees.mjs";
import { FGroupElement, zip, inverse } from "./group.mjs";

// Some test cases

const tree1 = parseToTree('a(b(c(df)))');
const tree2 = parseToTree('a(b((cd)f))');
const subdiv1 = tree1.getIntervalSubdivision();
const subdiv2 = tree2.getIntervalSubdivision();

const element = new FGroupElement(zip(subdiv1, subdiv2));
console.log((element.vertices));
console.log((element.domainSubdivision));
console.log((element.imageSubdivision));
console.log((element.slopes));

console.log('function value of 0.8 = ' + element.apply(0.8) + '\n');

const inv = inverse(element);
console.log(inv.vertices);
console.log(inv.slopes);