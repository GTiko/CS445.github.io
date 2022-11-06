class Subject {
  constructor() {
    this.observers = {};
  }
  on(event, fun) {
    if (this.observers[event]) {
      this.observers[event].push(fun);
    } else {
      this.observers[event] = [fun];
    }
  }
  emit(event, message) {
    if (this.observers[event]) {
      this.observers[event].forEach((fu) => fu(message));
    }
  }
}

const subject = new Subject();
subject.on("eat", console.log); // register an observer
subject.on("study", console.log); // register an observer

function foo(msg) {
  console.log("foo: " + msg);
}
subject.on("eat", foo);
subject.on("study", foo);

subject.emit("eat", "Corn");
//output for Line above: subject.emit('eat', 'Corn');
// Corn
// foo: Corn
subject.emit("study", "cs445");
//output for Line above: subject.emit('study', 'cs445');
// cs445
// foo: cs445
