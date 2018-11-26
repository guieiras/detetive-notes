import Cryptr from 'cryptr';
import config from '../environment/config';

const encryptor = new Cryptr(config.GAMESTATE_SECRET);

export default {
  save(object) {
    localStorage.setItem('_currentGame', encryptor.encrypt(JSON.stringify(object)));
  },

  fetch() {
    return JSON.parse(encryptor.decrypt(localStorage.getItem('_currentGame')));
  },

  isPresent() {
    return !!localStorage.getItem('_currentGame');
  },

  generateFromDraft(draft) {
    this.save({
      template: draft.id,
      characters: draft.template.bundle.characters.map((char) => { return { name: char, owner: '', flag: '' } }),
      weapons: draft.template.bundle.weapons.map((weapon) => { return { name: weapon, owner: '', flag: '' } }),
      places: draft.template.bundle.places.map((place) => { return { name: place, owner: '', flag: '' } }),
      players: draft.players.filter((player) => !!player)
    });
  }
}
