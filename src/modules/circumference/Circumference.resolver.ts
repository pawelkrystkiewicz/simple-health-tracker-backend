import { Resolver, Ctx, Mutation, Arg, Authorized, Query } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-core';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { IContext } from '../../types/IContext';
import { CircumferenceInput } from './CircumferenceInput';
import { Circumference } from '../../entity/Transaction';

@Resolver()
export class CircumferenceResolver {
	@Authorized()
	@Mutation((returns) => Circumference, { name: 'addCircumference', nullable: true })
	async addWeight(
		@Arg('data') { neck, forearm, waist, abdomen, hips, thigh, calf, wrist, createdAt }: CircumferenceInput,
		@Ctx() { req }: IContext
	): Promise<Circumference> {
		if (!req.session || !req.session.userId) {
			throw new AuthenticationError('You are not authenticated.');
		}
		const user = await User.findOneOrFail({ where: { id: req.session.userId } });
		const newCircumference = new Circumference();
		newCircumference.neck = neck;
		newCircumference.forearm = forearm;
		newCircumference.abdomen = abdomen;
		newCircumference.hips = hips;
		newCircumference.thigh = thigh;
		newCircumference.calf = calf;
		newCircumference.waist = waist;
		newCircumference.wrist = wrist;

		if (!!createdAt) {
			newCircumference.createdAt = createdAt;
		}
		newCircumference.user = user;
		await getConnection().manager.save(newCircumference);
		return newCircumference;
	}

	@Query((returns) => [Circumference ], { name: 'circumference', nullable: true })
	async weight(@Ctx() { req }: IContext): Promise<Circumference[]> {
		if (!req.session || !req.session.userId) {
			throw new AuthenticationError('You are not authenticated.');
		}
		return await Circumference.find({ where: { userId: req.session.userId } });
	}
}
