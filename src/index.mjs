import './styles.css';
import { customFetch } from './worker/clientDataLayer/customFetch';

document.getElementById('app').innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

async function fetchPost() {
  Promise.all([
    customFetch('https://swapi.dev/api/planets/1/'),
    customFetch('https://swapi.dev/api/planets/2/'),
  ])
    .then((output) => console.log('outout', output))
    .catch((e) => console.error(e));
}

fetchPost();
