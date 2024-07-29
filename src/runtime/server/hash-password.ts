import * as crypto from 'crypto';
import {useRuntimeConfig} from '#imports';

export async function hashPassword(password: string): Promise<string> {
  const {passwordSalt} = useRuntimeConfig().authenticationModule;

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, passwordSalt, 64, (error, derivedKey) => {
      if (error) {
        return reject(error);
      }

      resolve(derivedKey.toString('hex'));
    });
  });
}
