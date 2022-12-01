import { ToDoModel } from "./ToDo_model";

export class ToDoList{
    static ToDoList : ToDoModel[]
     model1 = new ToDoModel("ex1","faire l'exercice1")

     constructor(){ToDoList.ToDoList.push(this.model1)}

     }