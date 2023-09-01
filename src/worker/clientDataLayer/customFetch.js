import { CLIENT_DATA_LAYER_ACTION } from './constant';

const worker = new Worker(
  new URL('clientDataLayerWorker.js', import.meta.url),
  { type: 'module' }
);

export async function customFetch(url, options) {
  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      const { action } = event.data;
      if (action === CLIENT_DATA_LAYER_ACTION.FETCH) {
        resolve(event.data.response);
      }
    };

    console.info('---Sending Request to worker----');
    worker.postMessage({
      action: CLIENT_DATA_LAYER_ACTION.FETCH,
      requestInfo: { url, options },
    });
  });
}
