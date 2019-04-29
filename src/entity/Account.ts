import { Field, ID, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne
} from 'typeorm';

import { User } from './User';

@ObjectType()
@Entity()
export class Account extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column('varchar')
	name: string;

	@Field()
	@Column('varchar')
	number: string;

	@Field()
	@Column('varchar')
	description: string;

	@Field((type) => User)
	@ManyToOne((type) => User, (user) => user.account)
	user: User;

	/**---TECH FIELDS---**/
	@Field()
	@Column('int')
	createdBy: number;

	@Field()
	@Column('int')
	updatedBy: number;

	@Field({ nullable: true })
	@CreateDateColumn('timestamp')
	createdAt: Date;

	@Field({ nullable: true })
	@UpdateDateColumn('timestamp')
	updatedAt: Date;
}
