import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
        console.log("Inserted id with user : ", this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("After update with id : ", this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed User with id : ", this.id);
    }



}