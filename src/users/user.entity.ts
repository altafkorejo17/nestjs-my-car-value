import { log } from "console";
import {AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterRemove, AfterUpdate } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log("Inserted user with id: ", this.id);
    }

    @AfterRemove()
    logUpdate() {
        log("Updated with user id : ", this.id);
    }

    @AfterUpdate()
    logRemove() {
        log("Removed user with id: ", this.id);
    }

}