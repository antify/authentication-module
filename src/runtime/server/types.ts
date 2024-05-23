import type {Provider} from '../types';

export type Authentication = {
	identifier: string;
	password: string | null;
	provider: Provider
}
