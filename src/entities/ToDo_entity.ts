import { StatusEnum } from 'src/models/ToDo_model';
import { Entity , Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';
import { ToDoInterface } from './ToDo_interface';

@Entity('todo')
export class ToDoEntity extends ToDoInterface {
    
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name: string;

@Column()
description: string;

@Column({
    type:'enum',
    enum:StatusEnum,
    default:StatusEnum.waiting
})
status: StatusEnum;
}