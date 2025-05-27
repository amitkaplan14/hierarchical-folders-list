import React, { useState } from 'react';
import { FolderList, FolderItemData } from '../src';

// Mock data for the example
const generateMockData = (depth = 3, breadth = 5, prefix = ''): FolderItemData[] => {
  if (depth === 0) return [];
  
  const items: FolderItemData[] = [];
  
  for (let i = 0; i < breadth; i++) {
    const id = `${prefix}${i}`;
    const isFolder = depth > 1;
    
    const item: FolderItemData = {
      id,
      name: isFolder ? `Folder ${id}` : `File ${id}`,
      isFolder,
    };
    
    if (isFolder) {
      item.children = generateMockData(depth - 1, breadth, `${id}-`);
    }
    
    items.push(item);
  }
  
  return items;
};

// Large data set
const largeData = generateMockData(5, 10);

const Example: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FolderItemData | null>(null);
  
  const handleItemClick = (item: FolderItemData) => {
    setSelectedItem(item);
  };
  
  const handleItemDoubleClick = (item: FolderItemData) => {
    console.log('Double clicked:', item);
  };
  
  const handleContextMenu = (item: FolderItemData, event: React.MouseEvent) => {
    console.log('Context menu:', item, event);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Hierarchical Folders List Example</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Folder Tree</h2>
          <div style={{ height: '600px', border: '1px solid #ccc' }}>
            <FolderList
              data={largeData}
              onItemClick={handleItemClick}
              onItemDoubleClick={handleItemDoubleClick}
              onItemContextMenu={handleContextMenu}
              defaultExpandedIds={['0', '1']} // Expand first two top-level folders
              virtualizationOptions={{
                enabled: true,
                overscan: 10,
              }}
              keyboard={{
                enabled: true,
                expandOnEnter: true,
                collapseOnEscape: true,
                navigateWithArrows: true,
              }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Keyboard navigation:</strong></p>
            <ul style={{ fontSize: '14px' }}>
              <li>Use <code>Up/Down</code> arrows to navigate between items</li>
              <li>Use <code>Right</code> arrow to expand a folder</li>
              <li>Use <code>Left</code> arrow to collapse a folder or go to parent</li>
              <li>Press <code>Enter</code> to toggle folder expansion</li>
              <li>Press <code>Escape</code> to collapse or go to parent</li>
            </ul>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2>Selected Item</h2>
          <div
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              minHeight: '100px',
            }}
          >
            {selectedItem ? (
              <div>
                <p><strong>ID:</strong> {selectedItem.id}</p>
                <p><strong>Name:</strong> {selectedItem.name}</p>
                <p>
                  <strong>Type:</strong>{' '}
                  {selectedItem.isFolder ||
                  (selectedItem.children && selectedItem.children.length > 0)
                    ? 'Folder'
                    : 'File'}
                </p>
                {selectedItem.isFolder && (
                  <p>
                    <strong>Children:</strong>{' '}
                    {selectedItem.children?.length || 0}
                  </p>
                )}
              </div>
            ) : (
              <p>No item selected. Click on an item in the tree.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example; 