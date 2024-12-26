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
    Session,
    UseGuards
 } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuars } from 'src/guards/auth.guard';

@Controller('/auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Get("whoami")
    @UseGuards(AuthGuars)
    whoAmI(@CurrentUser() user: User ) {
        return user;
    }

    @Get('/color/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }
   
    @Get('/test')
    getTest(@Session() session: any) {
        return session.userId;
    }

    @Post("signout")
    signOut(@Session() session: any) {
        session.userId = null;
    }
    

    @Post("signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) { 
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @Post("signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @Get(":id")
    async findUser(@Param('id') id: string) {
        console.log("iam running in method");
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
