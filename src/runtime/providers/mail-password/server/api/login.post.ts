import {type H3Event} from 'h3';
import {validator} from '../../glue/login.post';
import {hashPassword} from '../../../../server/hash-password';
import {Provider} from '../../../../types';
import {type DataAdapter} from '../../../../server/adapters/data-adapter';
import {defineEventHandler, readBody, useNitroApp} from '#imports';
import defineDataAdapter from '#authentication-module-data-adapter';

export default defineEventHandler(async (event: H3Event) => {
  const requestData = validator.validate(await readBody(event));

  if (validator.hasErrors()) {
    throw new Error(validator.getErrorsAsString());
  }

  const authentication = await (defineDataAdapter as DataAdapter)
    .findAuthentication(requestData.email, await hashPassword(requestData.password), Provider.mailPassword);

  if (!authentication) {
    return {
      invalidCredentials: 'Invalid email or password - please check your credentials and try again.'
    };
  }

  await useNitroApp().hooks.callHook(`authenticationModule:${Provider.mailPassword}:login-success`, authentication, event);

  return {
    success: true
  };
});
