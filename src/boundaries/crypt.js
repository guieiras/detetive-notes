import Cryptr from 'cryptr';
import config from '../environment/config';

const encryptor = new Cryptr(config.GAMESTATE_SECRET);

export default {
  encrypt(object) {
    return encryptor.encrypt(JSON.stringify(object));
  },

  decrypt(string) {
    return JSON.parse(encryptor.decrypt(string));
  }
}
