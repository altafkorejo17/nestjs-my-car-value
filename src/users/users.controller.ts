import { 
    Body, 
    Controller, 
    Get, 
    Patch, 
    Param, 
    Post, 
    Query, 
    Delete, 
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor

 } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';

import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('/auth')
@serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService) {}
    @Post("signup")
    createUser(@Body() body: CreateUserDto) { 
        this.userService.create(body.email, body.password);
    }


    @Get(":id")
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (! user ) {
          throw new NotFoundException("User not found");  
        }

        return user;
    }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }


}
