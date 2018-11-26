import Dexie from 'dexie';

const db = new Dexie("detetive_notes");

db.version(1).stores({
  templates: 'id',
  drafts: 'id++'
});

export default db;
