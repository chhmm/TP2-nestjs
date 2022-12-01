import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './modules/ToDo_module';
import { ToDoService } from './services/ToDo_service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/ToDo_entity';
import { ToDoServiceDB } from './services/ToDo_services_database';
import { ToDoController } from './controllers/ToDo_controller';

@Module({
  imports: [ToDoModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'db_nestjs',
    entities: [ToDoEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature(
    [ToDoEntity]
    )],
  controllers: [AppController,ToDoController],
  providers: [AppService,ToDoService,ToDoServiceDB],
})
export class AppModule {}
