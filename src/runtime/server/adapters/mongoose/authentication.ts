import type {SchemaDefinition} from 'mongoose';

export const authenticationSchemaDefinition: SchemaDefinition = {
  identifier: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    required: true
  },
};
