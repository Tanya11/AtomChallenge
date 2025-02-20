export interface Task {
    id: string;
    title: string;
    description: string;
    creationDate: any;
    completed: boolean;
    editing?: boolean;
  }

  export interface User {
    id: string,
    correo: string;
    created: String
   
  }