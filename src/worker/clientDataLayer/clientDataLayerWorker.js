import { CLIENT_DATA_LAYER_ACTION } from './constant';

self.addEventListener('message', (event) => {
  const { requestInfo, action } = event.data;

  if (action === CLIENT_DATA_LAYER_ACTION.FETCH) {
    const fetchPromise = fetchData(requestInfo.url, requestInfo.options);
    Promise.resolve(fetchPromise)
      .catch((e) => console.error(e))
      .then((response) => {
        console.info('Worker: Fetch', response);
        self.postMessage({
          response,
          action,
        });
      });
  }
});

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const jsonData = await response.json();
  return jsonData;
}
