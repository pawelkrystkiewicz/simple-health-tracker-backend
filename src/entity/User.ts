import bcrypt from 'bcryptjs';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { Account } from './Account';
import * as config from '../utils/config';

export enum UserRole {
	admin = 'admin',
	user = 'user'
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column('varchar')
	firstName: string;

	@Field()
	@Column('varchar')
	lastName: string;

	@Field()
	name(@Root() parent: this): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@Field()
	@Index({ unique: true })
	@Column({ type: 'varchar', nullable: false })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'boolean', default: config.PROD })
	confirmed: boolean;

	@Column({ type: 'boolean', default: config.PROD })
	active: boolean;

	@Field((type) => Account)
	@OneToMany((type) => Account, (Account) => Account.user, { nullable: true })
	account: Account[];

	@Field()
	@CreateDateColumn('timestamp')
	createdAt: Date;

	@Field()
	@UpdateDateColumn('timestamp')
	updatedAt: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
