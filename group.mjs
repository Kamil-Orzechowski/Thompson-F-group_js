export class FGroupElement {
    constructor(vertices) {
        this.vertices = vertices;
        this.domainSubdivision = vertices.map(v => v[0]);
        this.imageSubdivision = vertices.map(v => v[1]);
    }
    getSlopes() {
        let slopes = [];
        for (let i = 0; i <= this.vertices.length - 2; i++) {
            slopes.push((this.imageSubdivision[i + 1] - this.imageSubdivision[i])
                / (this.domainSubdivision[i + 1] - this.domainSubdivision[i]));
        }
        return slopes;
    }
}