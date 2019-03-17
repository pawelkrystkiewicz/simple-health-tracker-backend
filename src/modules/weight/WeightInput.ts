import { Min, Max, IsDate } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { Weight } from '../../entity/Weight';

@InputType()
export class WeightInput implements Partial<Weight> {
	@Field()
	@Min(40)
	@Max(250)
	weight: number;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;
}
