import './styles.css';
import {
  customIDBQuery,
  customFetch,
} from './worker/clientDataLayer/clientDataLayerInterface';
import { InitIDB, createSchema } from './worker/clientDataLayer/idb/init';
import { schemaDefs } from './worker/clientDataLayer/idb/schemDefs';
import { addFriends } from './worker/clientDataLayer/idb/seed';

document.getElementById('app').innerHTML = `
<h1>Web Worker Example- Microsoft Teams: Client Data Layer! 🧑‍💼</h1>
<div>
  We are trying to build Client Data Layer Web Worker 🕸⚙️. Fetch, Data Transformation, Data Compliance, Indexdb Read/Write.
</div>

`;

const getPlanetsBtn = document.getElementById('getPlanetsBtn');
const planetsContainer = document.getElementById('planetsContainer');
const getFriendsBtn = document.getElementById('getFriendsBtn');
const addFriendsBtn = document.getElementById('addFriendsBtn');

getPlanetsBtn.addEventListener('click', async (e) => {
  const planets = await fetchPost();

  console.log({ planets });

  planets.forEach((planet) => {
    const childElement = document.createElement('h6');
    childElement.textContent = `
    
    ${planet.name} ${planet.climate} 
    
    `;
    planetsContainer.appendChild(childElement);
  });
});

getFriendsBtn.addEventListener('click', async (e) => {
  const friends = await getFriends();

  console.log({ friends });

  friends.forEach((friend) => {
    const childElement = document.createElement('h6');
    childElement.textContent = `
    
    ${friend.name} ${friend.age} 
    
    `;
    friendsContainer.appendChild(childElement);
  });
});

addFriendsBtn.addEventListener('click', async (e) => {
  const friendID = await putFriends();

  const childElement = document.createElement('h6');
  childElement.textContent = `
    Added Friend with id : ${friendID}
    
    `;
  friendsContainer.appendChild(childElement);
});

async function fetchPost() {
  const res1 = await customFetch('https://swapi.dev/api/planets/3/');
  const res2 = await customFetch('https://swapi.dev/api/planets/4/');

  console.log({ res1, res2 });

  const res3 = await Promise.all([
    customFetch('https://swapi.dev/api/planets/1/'),
    customFetch('https://swapi.dev/api/planets/2/'),
    customFetch('https://swapi.dev/api/planets/3/'),
    customFetch('https://swapi.dev/api/planets/4/'),
  ]);

  console.log({ res3 });

  return [res1, res2, ...res3];
}

// INDEX DB CODE

const dbName = 'MyDatabase';
function makeDatabaseReady() {
  const idbInstance = InitIDB(dbName);
  createSchema(idbInstance, { friends: '++id, name, age' });
  addFriends(idbInstance);
}

makeDatabaseReady();

async function getFriends() {
  const friends = await customIDBQuery(dbName, 1, schemaDefs[1], [
    {
      path: ['friends', 'bulkGet'],
      type: 'APPLY',
      argsList: [[1, 2]],
    },
  ]);

  return friends;
}

async function putFriends() {
  const friendID = await customIDBQuery(dbName, 1, schemaDefs[1], [
    {
      path: ['friends', 'put'],
      type: 'APPLY',
      argsList: [{ id: 5, name: 'Gaurav', age: 50 }],
    },
  ]);

  return friendID;
}
