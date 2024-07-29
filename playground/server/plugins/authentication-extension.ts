import {defineNitroPlugin} from '#imports';
// TODO:: import from #
import {Provider} from '../../../src/runtime/types';
import {Authentication} from '../../../src/runtime/server/datasources/authentication';

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook(`authenticationModule:${Provider.mailPassword}:login-success`, async (authentication: Authentication) => {
    console.info('User logged in successfully', authentication, `called from authenticationModule:${Provider.mailPassword}:login-success hook`);
  });
});
