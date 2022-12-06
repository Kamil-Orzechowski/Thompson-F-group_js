export class FGroupElement {
    constructor(points) {
        const slopes = getSlopes(points);
        const predicate = (item, index) =>
            index == 0 || index == points.length - 1
            || slopes[index - 1] != slopes[index];

        this.vertices = points.filter(predicate);
        this.slopes = slopes.filter(predicate);
        this.domainSubdivision = this.vertices.map(v => v[0]);
        this.imageSubdivision = this.vertices.map(v => v[1]);
    }
    apply(number) {
        let i = 0;
        while (this.domainSubdivision[i + 1] < number) { i++; }
        return this.imageSubdivision[i] + (number - this.domainSubdivision[i]) * this.slopes[i];
    }
}

function getSlopes(points) {
    let slopes = [];
    for (let i = 0; i <= points.length - 2; i++) {
        slopes.push((points[i + 1][1] - points[i][1])
            / (points[i + 1][0] - points[i][0]));
    }
    return slopes;
}

export const zip = (arr1, arr2) => arr1.map((v, i) => [v, arr2[i]]);

export function inverse(groupElement) {
    return new FGroupElement(zip(groupElement.imageSubdivision, groupElement.domainSubdivision));
}

export function compose(element1, element2) {
    const element2Inverse = inverse(element2);
    const preimages = element1.domainSubdivision.map(x => element2Inverse.apply(x));
    const newDomSubdiv = [...new Set(element2.domainSubdivision.concat(preimages)
        .sort((a, b) => a - b))];
    return new FGroupElement(newDomSubdiv.map(x => [x, element1.apply(element2.apply(x))]));
}

export const generators = {
    'A': new FGroupElement([[0.0, 0.0], [0.25, 0.5], [0.5, 0.75], [1.0, 1.0]]),
    'B': new FGroupElement([[0.0, 0.0], [0.5, 0.5], [0.625, 0.75], [0.75, 0.875], [1.0, 1.0]])
};