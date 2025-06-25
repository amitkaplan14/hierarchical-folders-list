// TypeScript test file to verify package consumption
import type { FolderItemData, FlattenedItem, FolderListProps } from './dist/types/index.d.ts';

// Test data
const testData: FolderItemData[] = [
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

// Test props
const testProps: FolderListProps = {
  data: testData,
  onItemClick: (item: FolderItemData) => {
    console.log('Clicked:', item.name);
  }
};

// Test flattened item
const testFlattenedItem: FlattenedItem = {
  id: '1',
  name: 'Test Item',
  isFolder: true,
  depth: 0,
  data: testData[0]
};

console.log('TypeScript compilation successful!');
console.log('Types imported correctly:');
console.log('- FolderItemData type exists:', typeof testData);
console.log('- FlattenedItem type exists:', typeof testFlattenedItem);
console.log('- FolderListProps type exists:', typeof testProps);
console.log('Test data:', testData); 