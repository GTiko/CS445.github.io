class User {
  constructor(name) {
    this.name = name;
  }
  logger() {
    console.log("user:" + this.name);
  }
}
class DecoratedUser {
  constructor(user, street, state) {
    this.user = user;
    this.name = user.name;
    this.street = street;
    this.state = state;
  }
  logger() {
    console.log(
      "decorated user: " + this.name + ", " + this.street + ", " + this.state
    );
  }
}
const user = new User("Kelly");
const decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.logger();
