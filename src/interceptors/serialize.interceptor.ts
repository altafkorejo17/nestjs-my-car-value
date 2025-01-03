import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';

import { UserDto } from 'src/users/dtos/user.dto';

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/user.entity';

interface ClassConstructor {
    new (...args: any[]): {}
}


export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                console.log("iam running before the resonse is sent out");
                return plainToClass(this.dto, data, {                
                    excludeExtraneousValues: true
                })

            })
        );
    }
}