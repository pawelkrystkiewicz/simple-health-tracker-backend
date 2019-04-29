import { Field, ID, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToOne
} from 'typeorm';

import { Transaction } from './Transaction';

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

	@Field((type) => Transaction)
	@ManyToOne((type) => Transaction, (Transaction) => Transaction.account)
	transaction: Transaction;

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
