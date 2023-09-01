import { CLIENT_DATA_LAYER_ACTION } from './constant';

onmessage = async (event) => {
  const { requestInfo, action } = event.data;

  if (action === CLIENT_DATA_LAYER_ACTION.FETCH) {
    const response = await fetchData(requestInfo.url, requestInfo.options);
    console.log('Worker: Fetch', response);
    postMessage({
      response,
      action,
    });
  }
};

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const jsonData = await response.json();
  return jsonData;
}
