// Test file to verify package consumption
const { FolderList, FolderItemData, FlattenedItem } = require('./dist/index.js');

// Test data
const testData = [
  {
    id: '1',
    name: 'Folder 1',
    isFolder: true,
    children: [
      {
        id: '1-1',
        name: 'File 1-1',
        isFolder: false
      }
    ]
  }
];

console.log('Package loaded successfully!');
console.log('FolderList component:', typeof FolderList);
console.log('FolderItemData type:', typeof FolderItemData);
console.log('FlattenedItem type:', typeof FlattenedItem);
console.log('Test data:', testData); 