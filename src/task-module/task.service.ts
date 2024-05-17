import { Injectable } from '@nestjs/common';
import { Task } from './interface/index';
import { v4 as uuidv4 } from 'uuid';
import { TaskDTO, UpdateTaskDTO } from './dto';
import { Err } from 'joi';

@Injectable()
export class TaskService {
    public tasks: Task[];

    constructor() {
        this.tasks = [];
    }

    public async getTasks(): Promise<Task[]> {
        return Promise.resolve(this.tasks);
    }

    public async getTask(id: string): Promise<Task | Error> {
        const task = this.tasks.findIndex(task => task.id === id);
        if(task === -1) {
            return Promise.resolve(new Error('Task not found'));
        }
        return Promise.resolve(this.tasks[task]);
    }

    public async addTask(task: TaskDTO): Promise<Task> {
        const createTask = {...task, id: uuidv4(), completed: false, owner: "dummy", duration: 0} as Task
        this.tasks.push(createTask);
        return Promise.resolve(createTask);
    }

    public updateTask(id: string, task: UpdateTaskDTO): Promise<Task[]> {
        const data = this.tasks.findIndex(task => task.id === id);
        if (data === -1) {
            return Promise.reject(new Error('Task not found'));
        }

        this.tasks[data] = {...this.tasks[data], ...task};
        return Promise.resolve(this.tasks);
    }

    public deleteTask(id: string): Promise<Task[]> {
        const data = this.tasks.findIndex(task => task.id === id);
        if (data === -1) {
            return Promise.reject(new Error('Task not found'));
        }

        this.tasks.splice(data, 1);
        return Promise.resolve(this.tasks);
    }

    public async filterTask(filter: boolean): Promise<Task []> {
        if(!filter){
         return Promise.resolve(this.tasks);
        }
        return Promise.resolve(this.tasks.filter(task => task.duration > 0));
    }
}
