import { Injectable, NotFoundException } from '@nestjs/common';
import { response } from 'express';
import { todoDto } from 'src/Dtos/toDoDto';
import { ToDoList } from 'src/models/ToDo_list';
import { ToDoModel } from 'src/models/ToDo_model';
import uuid = require('uuid');



@Injectable()
export class ToDoService {

    ToDoList : ToDoModel[] =[]

    addToDo(addTodo : todoDto){
        const todo = new ToDoModel(addTodo.name,addTodo.description)
        this.ToDoList.push(todo)
        return ({"added":todo})
    }
    getToDoById(id:number):any{
        const searchedToDo = this.ToDoList.find(ToDo => ToDo.id == id)
        if(searchedToDo) {
            const result = {"searched":searchedToDo}
            return(result)}
        else return('!!!!')

    }
    deleteToDoById(id){
        const toDeleteToDo = this.ToDoList.find(ToDo => ToDo.id == id)
        const index = this.ToDoList.indexOf(toDeleteToDo)
        if(index) {delete this.ToDoList[index]
                   toDeleteToDo.deletedAt = Date()
                   const result = {"deletedToDo":toDeleteToDo}
                   return result}
        else throw NotFoundException;
    }
    modifyToDo(id:number, modifyTodo:todoDto){
        const toModifyToDo = this.ToDoList.find(ToDo => ToDo.id == id)
        if(toModifyToDo){
                toModifyToDo.name = modifyTodo.name
                toModifyToDo.description = modifyTodo.description
                toModifyToDo.updatedAt = Date()
        const result = {"modifiedToDo":toModifyToDo}
        return result}
        else throw NotFoundException;
    }
    getTodoList(){
        return this.ToDoList
    }
 
}