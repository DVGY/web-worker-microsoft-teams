import { CLIENT_DATA_LAYER_ACTION } from './constant';

self.addEventListener('message', (event) => {
  const { requestInfo, action, id } = event.data;

  switch (action) {
    case CLIENT_DATA_LAYER_ACTION.FETCH:
      const fetchPromise = fetchData(requestInfo.url, requestInfo.options);
      Promise.resolve(fetchPromise)
        .catch((e) => console.error(e))
        .then((response) => {
          // console.info('Worker: Fetch', response);
          self.postMessage({
            response,
            action,
            id,
          });
        });
      break;
    case CLIENT_DATA_LAYER_ACTION.IDB_QUERY:
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


async function queryIDB(dbName, )