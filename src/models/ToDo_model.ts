export enum StatusEnum{
    'actif' = "En cours",
    'waiting' = "En attente",
    'done' = "Finalisé"
}
import uuid = require('uuid');



export class ToDoModel{
    id : number
    name : string
    description : string
    createdAt : string
    deletedAt : string = ""
    updatedAt : string = ""
    status : string

    constructor(name,description){
        this.id = uuid.v4();
        this.createdAt = Date();
        this.status = StatusEnum.waiting
        this.name = name
        this.description = description

    }
}