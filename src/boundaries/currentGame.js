export default {
  save(object) {
    localStorage.setItem('_currentGame', JSON.stringify(object));
  },

  fetch() {
    try {
      return JSON.parse(localStorage.getItem('_currentGame'));
    } catch {
      return undefined;
    }
  },

  isPresent() {
    return !!localStorage.getItem('_currentGame');
  },

  destroy() {
    return localStorage.removeItem('_currentGame');
  },

  toEmpty() {
    const filledGame = this.fetch();
    return [
      filledGame.characters.map((char) => char.name),
      filledGame.weapons.map((weapon) => weapon.name),
      filledGame.places.map((place) => place.name),
      filledGame.players
    ];
  },

  generateFromDraft(draft) {
    this.save({
      template: draft.id,
      characters: draft.template.bundle.characters.map((char) => { return { name: char, owners: [], flags: [] } }),
      weapons: draft.template.bundle.weapons.map((weapon) => { return { name: weapon, owners: [], flags: [] } }),
      places: draft.template.bundle.places.map((place) => { return { name: place, owners: [], flags: [] } }),
      players: draft.players.filter((player) => !!player)
    });
  }
}
