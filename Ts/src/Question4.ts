interface baseObject {
  width: number;
  length: number;
  calcSize: () => number;
}

class base implements baseObject {
  public width: number;
  length: number;
  constructor(width: number, length: number) {
    this.width = width;
    this.length = length;
  }
  calcSize() {
    return this.width * this.length;
  }
}
let rectangle = new base(5, 2);
console.log(rectangle.calcSize());
