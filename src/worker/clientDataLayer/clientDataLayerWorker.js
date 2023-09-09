import { Dexie } from 'dexie';

import { CLIENT_DATA_LAYER_ACTION } from './constant';

self.addEventListener('message', (event) => {
  const { requestInfo, action, id } = event.data;

  switch (action) {
    case CLIENT_DATA_LAYER_ACTION.FETCH:
      const fetchPromise = fetchData(requestInfo.url, requestInfo.options);
      Promise.resolve(fetchPromise)
        .catch((e) => console.error(e))
        .then((response) => {
          self.postMessage({
            response,
            action,
            id,
          });
        });
      break;
    case CLIENT_DATA_LAYER_ACTION.IDB_QUERY:
      const queryIDBPromise = queryIDB(
        requestInfo.dbName,
        requestInfo.version,
        requestInfo.schemaDef,
        requestInfo.queries
      );
      Promise.resolve(queryIDBPromise)
        .catch((e) => console.error(e))
        .then((response) => {
          console.log(response, id, action);
          self.postMessage({
            response,
            action,
            id,
          });
        });
      break;
    default:
      console.error(`Wrong ${action} Action Type`);
  }
});

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const jsonData = await response.json();
  return jsonData;
}

async function queryIDB(dbName, version, schemaDef, queries) {
  const { path, type, argsList } = queries[0];

  const originalDB = new Dexie(dbName);
  const v = originalDB.version(version).stores(schemaDef);

  const query = await executePath(originalDB, path, type, argsList)();
  return query;
}

// UTILS FUNC

function executePath(instance, path, type, argsList) {
  let currentInstance = instance;

  for (const prop of path) {
    if (prop in currentInstance) {
      const methodOrProperty = currentInstance[prop];

      if (type === 'APPLY' && typeof methodOrProperty === 'function') {
        currentInstance = methodOrProperty.bind(currentInstance, ...argsList);
      } else {
        currentInstance = methodOrProperty;
      }
    } else {
      throw new Error(`Invalid path prop: ${prop}`);
    }
  }

  return currentInstance;
}
