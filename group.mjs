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
        while(this.domainSubdivision[i + 1] < number) {i++;}
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