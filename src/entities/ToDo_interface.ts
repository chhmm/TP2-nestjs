import {Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn} from 'typeorm';

export class ToDoInterface{

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn({update:false})
    UpdatedAt: Date;
    
    @DeleteDateColumn()
    DeletedAt: Date;
}