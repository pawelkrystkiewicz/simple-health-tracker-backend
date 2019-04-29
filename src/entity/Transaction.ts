import { Field, ID, ObjectType } from 'type-graphql';
import {
	BeforeInsert,
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany
} from 'typeorm';

export enum TransactionType {
	income = 'income',
	expense = 'expense',
	transfer = 'transfer'
}

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: 'float' })
	value: number;

	@Field()
	@Column({ type: 'varchar', nullable: true })
	name: string;

	@Field((type) => Currency)
	@ManyToOne((type) => Currency, (Currency) => Currency.id, { onDelete: 'SET NULL' })
	currency: Currency;
	@Field()
	@Column({ type: 'varchar', nullable: true })
	comment: string;

	@Field((type) => RepeatPattern)
	@ManyToOne((type) => RepeatPattern, (RepeatPattern) => RepeatPattern.id, { nullable: true, onDelete: 'SET NULL' })
	repeat: RepeatPattern;

	@Field()
	@Column({ type: 'enum', enum: TransactionType, default: TransactionType.expense })
	type: TransactionType;

	@Field((type) => Category)
	@ManyToMany((type) => Category, (Category) => Category.id, { nullable: true, onDelete: 'SET NULL' })
	category: Category;

	@Field((type) => Project)
	@ManyToOne((type) => Project, (Project) => Project.id, { nullable: true, onDelete: 'SET NULL' })
	category: Project;

	@Field((type) => Account)
	@ManyToOne((type) => Account, (Account) => Account.id, { nullable: true, onDelete: 'SET NULL' })
	account: Account;

	@Field((type) => Attachment)
	@ManyToOne((type) => Attachment, (Attachment) => Attachment.id, { nullable: true, onDelete: 'SET NULL' })
	attachment: Attachment;

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

	@BeforeInsert()
	async setDate() {
		this.updatedAt = new Date();
	}
}
