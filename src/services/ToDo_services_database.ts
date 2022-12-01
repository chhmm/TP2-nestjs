import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { todoDto } from "src/Dtos/toDoDto";

import { ToDoEntity } from "src/entities/ToDo_entity";
import { StatusEnum, ToDoModel } from "src/models/ToDo_model";
import { Brackets, Equal, Like, Repository } from "typeorm";

@Injectable()
export class ToDoServiceDB {
  constructor(@InjectRepository(ToDoEntity) private ToDoRepo : Repository<ToDoEntity>){}

  async getToDoListDB(){
    return await this.ToDoRepo.find();
  }

  async getToDoByIdDB(id){
    const searchedToDo = await this.ToDoRepo.findOneBy({id:id})
  if (!searchedToDo) {
    throw new NotFoundException(`Le ToDo d'id ${id} n'existe pas`);
  }
  else
    return (searchedToDo);
  }

  async  getPagesDB(offset){
    let page =  await this.ToDoRepo
        .createQueryBuilder("ToDo").select(["ToDo.id","ToDo.name","ToDo.description"]).take(offset).getMany()
      
    return page

  }

  async getSpecialToDos(chaine, status){
    const resultList : ToDoEntity[][] =[]
    if(status){
     const statusFound = await this.ToDoRepo.findBy({ status : Equal(status) })

     if(!(resultList.includes(statusFound)))resultList.push(statusFound)
    }
    if(chaine){
      let stringFound = await this.ToDoRepo.findBy({ name: Like(`%${chaine}%`)})
      if(!(resultList.includes(stringFound)))resultList.push(stringFound)
      stringFound = await this.ToDoRepo.findBy({ description: Like(`%${chaine}%`)})
      if(!(resultList.includes(stringFound)))resultList.push(stringFound)
    }
    
      return resultList
    }

    async getSpecialToDos2(chaine, status){
      var data = await this.ToDoRepo
      .createQueryBuilder("ToDo")
      .where("ToDo.status = :status", { status:status })
      .andWhere(new Brackets(
        qb => {
        qb.where("ToDo.name like :name", { name:`%${chaine}%` })
        .orWhere("ToDo.description like :description", { description:`%${chaine}%` })}
        )).getMany()
        
      return data
    }

    async countByStatus() {
      let actif= await this.ToDoRepo.countBy({status : StatusEnum.actif});
      let waiting= await this.ToDoRepo.countBy({status : StatusEnum.waiting});
      let done= await this.ToDoRepo.countBy({status : StatusEnum.done});
      return({"actif":actif,"waiting":waiting,"done":done})
      }


  async addToDoDB(todo : todoDto):Promise<ToDoEntity> {
    return this.ToDoRepo.save(todo);
   }

  async modifyToDoDB(id, modifyTodo : todoDto):Promise<ToDoEntity>{
    const toModifyToDo = await this.ToDoRepo.preload({id,...modifyTodo});
    if(!toModifyToDo) {
      throw new NotFoundException(`Le ToDo d'id ${id} n'existe pas`);
    }
    else
      return await this.ToDoRepo.save(toModifyToDo);
    }
  

  async deleteToDoByIdBD(id){
    const toDeleteToDo = await this.ToDoRepo.find(id)
    if (!toDeleteToDo) {
      throw new NotFoundException(`Le ToDo d'id ${id} n'existe pas`);
    }
    else
      return this.ToDoRepo.delete(id);
  }

  async softDeleteToDoBD(id) {
    const toDeleteToDo = await this.ToDoRepo.find(id)
  
    if (!toDeleteToDo) {
      throw new NotFoundException(`Le ToDo d'id ${id} n'existe pas`);
    }
    else
      return this.ToDoRepo.softDelete(id);
    
  }

  async restoreToDoBD(id) {

    const ToDo = await this.ToDoRepo.find(id);
    if (!ToDo) {
      throw new NotFoundException(`Le ToDo d'id ${id} n'existe pas`);
    }
    else
      return this.ToDoRepo.restore(id);}
     
        }


