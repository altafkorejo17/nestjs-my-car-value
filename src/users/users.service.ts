import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    async findOneBy(id: number) {
        return  await this.repo.findOneBy({
            id
        });
    }

    find(email: string) {
        return this.repo.findBy({email});
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneBy(id);
        if(!user) {
            throw new Error("User not found");
        }

        Object.assign(user, attrs);
        return this.repo.save(user)
    }
}
