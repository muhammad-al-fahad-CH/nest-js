import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TransformFnParams, Transform } from 'class-transformer';

export class TaskDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsDefined()
  description: string;
}

export class ParamTaskDTO {
  @IsString()
  @IsDefined()
  id: string;
}

export class UpdateTaskDTO {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsBoolean()
  @IsDefined()
  completed: boolean;

  @IsString()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class QueryTaskDTO {
  @IsBoolean()
  @IsDefined()
  @Transform((value: TransformFnParams): boolean => {
    if (typeof value === 'string') {
      return Boolean(value);
    } else value;
  })
  filter: boolean;
}
