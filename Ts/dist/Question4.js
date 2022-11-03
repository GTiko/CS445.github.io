"use strict";
class base {
    constructor(width, length) {
        this.width = width;
        this.length = length;
    }
    calcSize() {
        return this.width * this.length;
    }
}
let rectangle = new base(5, 2);
console.log(rectangle.calcSize());
