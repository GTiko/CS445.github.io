class regular {
  constructor() {
    this.lumen = [50, 100];
    this.last = 1;
  }
}

class energy {
  constructor(color) {
    this.lumen = [5, 40];
    this.last = 10;
    this.color = color;
  }
}

class Factory {
  createBulb(type, color) {
    let bulb;
    if (type == "regular") {
      bulb = new regular(type);
    }
    if (type == "energy") {
      bulb = new energy(type, color);
    }
    bulb.type = type;
    return bulb;
  }
}

const bulbs = [];
const factory = new Factory();

bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));

for (let i = 0, len = bulbs.length; i < len; i++) {
  console.log(bulbs[i]);
}
