import './styles.css';
import { customFetch } from './worker/clientDataLayer/customFetch';

document.getElementById('app').innerHTML = `
<h1>Web Worker Example- Microsoft Teams: Client Data Layer! 🧑‍💼</h1>
<div>
  We are trying to build Client Data Layer Web Worker 🕸⚙️. Fetch, Data Transformation, Data Compliance, Indexdb Read/Write.
</div>

<div>
 <h2>Fetch Planets using Web Worker</h2>
 <button id='getPlanetsBtn'>Get Planets</button>
 <div id='planetsContainer'>
 
 </div>
</div>
`;

const getPlanetsBtn = document.getElementById('getPlanetsBtn');
const planetsContainer = document.getElementById('planetsContainer');

getPlanetsBtn.addEventListener('click', async (e) => {
  const posts = await fetchPost();

  console.log({ posts });

  posts.forEach((post) => {
    const childElement = document.createElement('h6');
    childElement.textContent = `
    
    <h6> ${post.name} ${post.climate} </h6>
    
    `;
    planetsContainer.appendChild(childElement);
  });
});

async function fetchPost() {
  // const res1 = await customFetch('https://swapi.dev/api/planets/3/');
  // const res2 = await customFetch('https://swapi.dev/api/planets/4/');

  // console.log({ res1, res2 });

  // return [res1, res2];

  return await Promise.all([
    customFetch('https://swapi.dev/api/planets/1/'),
    customFetch('https://swapi.dev/api/planets/3/'),
  ]);
}

// fetchPost();
