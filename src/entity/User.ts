import bcrypt from 'bcryptjs';
import { Weight } from './Weight';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import { BaseEntity, BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Circumference } from './Circumference';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	fullName(@Root() parent: this): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@Field()
	@Index({ unique: true })
	@Column({ type: 'varchar', nullable: false })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'boolean', default: true })
	confirmed: boolean;

	@Field({ nullable: true })
	@Column({ type: 'float', nullable: true })
	height: string;

	@OneToMany((type) => Weight, (weight) => weight.user)
	weight: Weight[];

	@OneToMany((type) => Circumference, (circumference) => circumference.user)
	circumference: Circumference[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
