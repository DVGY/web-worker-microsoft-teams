import { CLIENT_DATA_LAYER_ACTION } from './constant';

const worker = new Worker(
  new URL('clientDataLayerWorker.js', import.meta.url),
  { type: 'module' }
);

export async function customFetch(url, options) {
  return new Promise((resolve, reject) => {
    const id = Date.now() + Math.random();
    worker.addEventListener('message', function handleMessage(event) {
      if (id === event.data.id) {
        // console.log('Resolving: ', event.data);
        worker.removeEventListener('message', handleMessage);
        resolve(event.data.response);
      }
    });

    // console.info('---Sending Request to worker----');
    worker.postMessage({
      action: CLIENT_DATA_LAYER_ACTION.FETCH,
      requestInfo: { url, options },
      id,
    });
  });
}

export function IDBQuery(db) {
  return new Promise((resolve, reject) => {
    const id = Date.now() + Math.random();
    worker.addEventListener('message', function handleMessage(event) {
      if (id === event.data.id) {
        // console.log('Resolving: ', event.data);
        worker.removeEventListener('message', handleMessage);
        resolve(event.data.response);
      }
    });

    // console.info('---Sending Request to worker----');
    worker.postMessage({
      action: CLIENT_DATA_LAYER_ACTION.IDB_QUERY,
      requestInfo: { dbName },
      id,
    });
  });
}
