interface bank {
  money: number;
  deposit: (value: number) => void;
}
interface self {
  name: string;
  bankAccount: any;
  hobbies: string[];
}

let bankAccount: bank = {
  money: 2000,
  deposit(value) {
    this.money += value;
  },
};

let myself: self = {
  name: "John",
  bankAccount: bankAccount,
  hobbies: ["Violin", "Cooking"],
};

myself.bankAccount.deposit(3000);
console.log(myself);
