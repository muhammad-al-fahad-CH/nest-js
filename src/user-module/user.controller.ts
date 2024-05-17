import { Body, Controller, Delete, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UsePipes, Req, Res, ValidationPipe, UseFilters, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './filter';
// import { JoiValidationPipe } from './pipe';
// import * as Joi from 'joi';
import { AuthGuard } from './guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  // this middleware also used in main instead of using in every API
  @UsePipes(new ValidationPipe())
  getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
    @Body() user: UserDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const body = req.body;
    const query = req.query;
    const params = req.params;
    const headers = req.headers;
    const cookies = req.cookies;
    const ip = req.ip;
    const method = req.method;
    const path = req.path;
    const hostname = req.hostname;
    const protocol = req.protocol;
    const url = req.url;

    const users = this.userService.getUsers();
    return res.status(200).json({ users });
  }

  @Get(':id')
  @HttpCode(200)
  // this middleware also used in main instead of using in every API
  @UseFilters(new HttpExceptionFilter())
  async getUser(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.getUser(id);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  @Post()
  // @UsePipes(new JoiValidationPipe({
  //   name: Joi.string().required(),
  //   email: Joi.string().required(),
  //   address: Joi.string().required(),
  // }))
  postUser(@Body() params: UserDto): User {
    return this.userService.addUser({
      id: Date.now(),
      name: params.name,
      email: params.email,
      address: params.address,
    });
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteUser(@Param('id') id: number): User[] {
    return this.userService.deleteUser(id);
  }
}