// TODO:: Fix import path
import {type Authentication} from '../../../../../../src/runtime/server/types';
import {authenticationSchemaDefinition} from '../../../../../../src/runtime/server/adapters/mongoose/authentication';
import {defineSchema} from '@antify/database';

export interface User {
  email: string;
  authentications: Authentication[];
}

export default defineSchema(async (client) => {
  client.getSchema('users').add({
    email: {
      type: String,
      required: true,
      unique: true
    },
    authentications: [authenticationSchemaDefinition]
  });
});
