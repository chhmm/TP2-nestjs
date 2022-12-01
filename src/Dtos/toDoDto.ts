import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from 'src/models/ToDo_model';


export class todoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

}