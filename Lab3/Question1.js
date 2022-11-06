class ShoppingCart {
    constructor() {
      this.basket = [];
    }
    upsertItem(item) {
      for (let i = 0; i < this.basket.length; i++) {
        let index = this.basket[i];
        if (index.id === item.id) {
          this.basket[i] = item;
          return;
        }
      }
      this.basket.push(item);
    }
  
    getItemsCount() {
      return this.basket.length;
    }
    getTotalPrice() {
      let sum = 0;
      for (let each of this.basket) {
        sum += each.product.price * each.count;
      }
      return sum;
    }
    removeItemById(id) {
      let index = this.basket.findIndex((pro) => pro.id == id);
      this.basket.splice(index, 1);
    }
  }
  
  let shoppingCart = new ShoppingCart();
  
  const item1 = {
    id: 0,
    product: {
      id: 1,
      name: "Coffee",
      description: "Coffee Grounds from Ethiopia",
      price: 9,
    },
    count: 1,
  };
  const item2 = {
    id: 1,
    product: {
      id: 2,
      name: "Tea",
      description: "Oonlong Tea from China",
      price: 10,
    },
    count: 5,
  };
  const item3 = {
    id: 2,
    product: {
      id: 3,
      name: "Bottled Water",
      description: "Bottled Water from US",
      price: 2,
    },
    count: 30,
  };
  
  shoppingCart.upsertItem(item1);
  shoppingCart.upsertItem(item2);
  shoppingCart.upsertItem(item3);
  console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
  item3.product.name = "Himilayan Water";
  item3.product.price = 10;
  
  shoppingCart.upsertItem(item3);
  
  console.log(shoppingCart.getItemsCount()); //Expected Result: 3
  console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
  shoppingCart.removeItemById(1);
  console.log(shoppingCart.getItemsCount()); //Expected Result: 2
  console.log(shoppingCart.getTotalPrice()); //Expected Result: 309
  