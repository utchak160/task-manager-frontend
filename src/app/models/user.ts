export interface User {
  name: string;
  email: string;
  age: number;
  password: string;
}

export interface Member {
  _id?: string;
  email: string;
  password: string;
}
