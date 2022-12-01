import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Version } from '@nestjs/common';
import { todoDto } from 'src/Dtos/toDoDto';

import { ToDoService } from 'src/services/ToDo_service';
import { ToDoServiceDB } from 'src/services/ToDo_services_database';


@Controller('')
export class ToDoController {
  constructor(private readonly Service1:ToDoService, private readonly Service2:ToDoServiceDB){}
  //---------------------------------------
  @Get()
  @Version('1')
  get1(){
    return this.Service1.getTodoList()
  }

  @Get()
  @Version('2')
  get2(){
    return this.Service2.getToDoListDB()
  }

  @Get('/:id')
  @Version('1')
  getById(@Param('id')id){
    return this.Service1.getToDoById(id)
  }

  @Get('/:id')
  @Version('2')
  getById2(@Param('id')id){
    return this.Service2.getToDoByIdDB(id)
  }

  @Get('/:offset')
  @Version('3')
  getPages(@Param('offset')offset){
    return this.Service2.getPagesDB(offset)
  }

  @Get('/:chaine?/:statut?')
  @Version('1')
  getSpecific(@Param('chaine')chaine,@Param('statut')statut){
    return this.Service2.getSpecialToDos(chaine,statut)

  }

  @Get('/:chaine?/:statut?')
  @Version('2')
  getSpecific2(@Param('chaine')chaine,@Param('statut')statut){
    return this.Service2.getSpecialToDos2(chaine,statut)
  }

  @Get('countStatus')
  count(){
    return this.Service2.countByStatus()
  }
  //------------------------------------------------------------
  @Post()
  @Version('1')
  add(@Body() addTodoDto : todoDto){
    return this.Service1.addToDo(addTodoDto)  }

  @Post()
  @Version('2')
  add2(@Body() addTodoDto : todoDto){
    return this.Service2.addToDoDB(addTodoDto) }

  //------------------------------------------------------------------------------
  @Patch('/:id')
  @Version('1')
  modify(@Body()ModifyTodoDto : todoDto,
         @Param('id')id){
    return this.Service1.modifyToDo(id,ModifyTodoDto)
  }

  @Patch('/:id')
  @Version('2')
  modify2(@Body()ModifyTodoDto : todoDto,
          @Param('id')id){
    return this.Service2.modifyToDoDB(id,ModifyTodoDto)
  }
  //------------------------------------------------
  @Delete('/:id')
  @Version('1')
  delete(@Param('id')id){
    return this.Service1.deleteToDoById(id)
  }


  @Delete('/:id')
  @Version('2')
  delete2(@Param('id')id){
    return this.Service2.deleteToDoByIdBD(id)
  }

  @Delete('/:id')
  @Version('3')
  softDelete(@Param('id')id){
    return this.Service2.softDeleteToDoBD(id)
  }
  //-------------------------------------------
  @Post('restore/:id')
  restoreToDo(@Param('id')id){
    return this.Service2.restoreToDoBD(id)
  }
 
}