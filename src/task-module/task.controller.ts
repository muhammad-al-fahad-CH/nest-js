import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interface';
import { Response } from 'express';
import { ParamTaskDTO, QueryTaskDTO, TaskDTO, UpdateTaskDTO } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Res() res: Response) {
    const data = await this.taskService.getTasks();
    return res.status(200).json(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postTask(@Body() task: TaskDTO, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(201).json(data);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getTask(@Param() params: ParamTaskDTO, @Res() res: Response) {
    const data = await this.taskService.getTask(params.id);
    if(data instanceof Error) {
      return res.status(404).json({message: (data as Error).message});
    }
    return res.status(200).json(data);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getFilterTasks(@Query() query: QueryTaskDTO, @Res() res: Response) {
    const data = await this.taskService.filterTask(query.filter);
    return res.status(200).json(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTask(@Param() params: ParamTaskDTO, @Body() body: UpdateTaskDTO, @Res() res: Response) {
    const data = await this.taskService.updateTask(params.id, body);
    if(data instanceof Error) {
      return res.status(404).json({message: (data as Error).message});
    }
    return res.status(200).json(data);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteTask(@Param() params: ParamTaskDTO, @Res() res: Response) {
    const data = await this.taskService.deleteTask(params.id);
    if(data instanceof Error) {
      return res.status(404).json({message: (data as Error).message});
    }
    return res.status(200).json(data);
  }
}