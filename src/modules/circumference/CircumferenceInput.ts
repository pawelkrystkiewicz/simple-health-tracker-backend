import { Min, Max, IsDate } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { Circumference } from '../../entity/Transaction';

@InputType()
export class CircumferenceInput implements Partial<Circumference> {
	@Field()
	@Min(10)
	@Max(50)
	neck: number;

	@Field()
	@Min(10)
	@Max(100)
	forearm: number;

	@Field()
	@Min(40)
	@Max(250)
	waist: number;

	@Field()
	@Min(40)
	@Max(250)
	abdomen: number;

	@Field()
	@Min(40)
	@Max(250)
	hips: number;

	@Field()
	@Min(20)
	@Max(250)
	thigh: number;

	@Field()
	@Min(10)
	@Max(250)
	calf: number;

	@Field()
	@Min(10)
	@Max(30)
	wrist: number;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;
}
