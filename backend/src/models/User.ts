import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nome: string;

    @Column('varchar', { length: 150, nullable: false })
    email: string;
}

export default User;