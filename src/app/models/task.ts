export interface Task {
  _id?: string;
  owner?: string;
  description: string;
  completed: boolean;
}
