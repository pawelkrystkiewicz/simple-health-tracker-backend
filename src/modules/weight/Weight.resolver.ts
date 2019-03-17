import { Resolver, Ctx, Mutation, Arg, Authorized, Query } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-core';
import { getConnection } from 'typeorm';
import { Weight } from '../../entity/Weight';
import { User } from '../../entity/User';
import { IContext } from '../../types/IContext';
import { WeightInput } from './WeightInput';

@Resolver()
export class WeightResolver {
	@Authorized()
	@Mutation((returns) => Weight, { name: 'addWeight', nullable: true })
	async addWeight(@Arg('data') { weight, createdAt }: WeightInput, @Ctx() { req }: IContext): Promise<Weight> {
		if (!req.session || !req.session.userId) {
			throw new AuthenticationError('You are not authenticated.');
		}
		const user = await User.findOneOrFail({ where: { id: req.session.userId } });
		const newWeight = new Weight();
		newWeight.weight = weight;
		if (!!createdAt) {
			newWeight.createdAt = createdAt;
		}
		newWeight.user = user;
		await getConnection().manager.save(newWeight);
		return newWeight;
	}

	@Query((returns) => [ Weight ], { name: 'weight', nullable: true })
	async weight(@Ctx() { req }: IContext): Promise<Weight[]> {
		if (!req.session || !req.session.userId) {
			throw new AuthenticationError('You are not authenticated.');
		}
		return await Weight.find({ where: { userId: req.session.userId } });
	}
}
