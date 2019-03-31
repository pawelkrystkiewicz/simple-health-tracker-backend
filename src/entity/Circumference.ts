import { Field, ID, ObjectType } from 'type-graphql';
import { BeforeInsert, BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
@ObjectType()
@Entity()
export class Circumference extends BaseEntity {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	neck: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	forearm: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	waist: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	abdomen: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	hips: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	thigh: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	calf: number;

	@Field({ nullable: true })
	@Column({ type: 'int' })
	wrist: number;

	@ManyToOne((type) => User, (user) => user.weight)
	user: User;

	@Field({ nullable: true })
	@Column('timestamp', { default: new Date() })
	// @CreateDateColumn()
	createdAt: Date;

	@Field({ nullable: true })
	// @UpdateDateColumn()
	@Column('timestamp', { default: new Date() })
	updatedAt: Date;

	@BeforeInsert()
	async setDate() {
		this.updatedAt = new Date();
	}
}
