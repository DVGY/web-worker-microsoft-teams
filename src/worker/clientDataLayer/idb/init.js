import { Dexie } from 'dexie';

export function InitIDB(dbName) {
  try {
    return new Dexie(dbName);
  } catch (error) {
    console.error(error);
  }
}

export function createSchema(db, schemaDefinition) {
  try {
    return db.version(1).stores(schemaDefinition);
  } catch (error) {
    console.log(error);
  }
}
