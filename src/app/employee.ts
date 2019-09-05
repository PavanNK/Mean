export class Employee {
  id: number;
  name: string;
  age: number;
  email: string;

  constructor(
    public id: number,
    public name: string,
    public age: number,
    public email: string
  ) {
    Object.assign(this, {name, age, email});
  }
}
