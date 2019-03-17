import { Field, ID, ObjectType } from 'type-graphql';
import {
	BeforeInsert,
	BaseEntity,
	// UpdateDateColumn,
	// CreateDateColumn,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne
} from 'typeorm';
import { User } from './User';
@ObjectType()
@Entity()
export class Weight extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column({ type: 'float' })
	weight: number;

	@ManyToOne((type) => User, (user) => user.weight)
	user: User;

	@Field({ nullable: true })
	@Column('timestamp', { default: new Date() })
	// @CreateDateColumn()
	createdAt: Date;

	@Field({ nullable: true })
	// @UpdateDateColumn()
	@Column('timestamp',{  default: new Date()})
	updatedAt: Date;

	@BeforeInsert()
	async setDate() {
		this.updatedAt = new Date();
	}
}
