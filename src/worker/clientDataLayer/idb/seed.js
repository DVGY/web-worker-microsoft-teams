export async function addFriends(dbInstance) {
  await dbInstance.friends.bulkPut([
    { id: 1, name: 'Josephine', age: 21 },
    { id: 2, name: 'Per', age: 75 },
    { id: 3, name: 'Simon', age: 5 },
    { id: 4, name: 'Sara', age: 50, notIndexedProperty: 'foo' },
  ]);
}
