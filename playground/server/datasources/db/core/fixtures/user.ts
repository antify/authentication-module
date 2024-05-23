import {defineFixture} from '@antify/database';
import {type User} from '../schemas/user';
// TODO:: how to import Provider enum in fixtures context?
import {Provider} from '../../../../../../src/runtime/types';
import {hashPassword} from '../../../../../../src/cli/hash-password';

export const PASSWORD_SALT = '#a!SaveSalt123';
export const ADMIN_USER_ID = '63f73526b5db16c4a92d6c37';
export const EMPLOYEE_USER_ID = '63f73526b5db16c4a92d6c38';

export default defineFixture({
	async load(client) {
		await client.getModel<User>('users').insertMany([
			{
				_id: ADMIN_USER_ID,
				email: 'admin@admin.de',
				authentications: [
					{
						identifier: 'admin@admin.de',
						password: await hashPassword('admin', PASSWORD_SALT),
						provider: Provider.mailPassword
					}
				]
			},
			{
				_id: EMPLOYEE_USER_ID,
				email: 'user@user.de',
				authentications: [
					{
						identifier: 'user@user.de',
						password: await hashPassword('admin', PASSWORD_SALT),
						provider: Provider.mailPassword
					}
				]
			}
		]);
	},

	dependsOn() {
		return [];
	}
});
