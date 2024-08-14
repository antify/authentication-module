import {type Provider} from '../../types';
import {type Authentication} from '../types';

export type DataAdapter = {
  findAuthentication(identifier: string, password: string, provider: Provider): Promise<Authentication | null>
}

export const defineDataAdapter = (databaseHandler: DataAdapter): DataAdapter => databaseHandler;
