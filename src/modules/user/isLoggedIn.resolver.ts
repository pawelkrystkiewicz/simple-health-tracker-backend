import { Resolver, Ctx, Query } from 'type-graphql';
import { IContext } from '../../types/IContext';

@Resolver()
export class AuthResolver {
	@Query((returns) => Boolean)
	async isLoggedIn(@Ctx() { req }: IContext): Promise<Boolean> {
		if (!req.session || !req.session.userId) {
			return false;
		} else {
			return true;
		}
	}
}
