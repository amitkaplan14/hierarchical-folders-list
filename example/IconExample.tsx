import React, { useState } from 'react';
import { FolderList, FolderItemData, IconConfig, createFileExtensionIconResolver } from '../src';

// Custom icon components (these would typically come from an icon library)
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="#ffc107" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const FolderOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="#ff9800" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6h-2.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9c-.56 0-1.1.24-1.47.65L6.17 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="#f7df1e" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#f7df1e"/>
    <path d="M7.5 15.5c0 1.25.5 2.5 2.5 2.5s2.5-1.25 2.5-2.5v-7h-2v7c0 .5-.25.75-.5.75s-.5-.25-.5-.75v-7h-2v7zm7-7h-2v7c0 1.25.5 2.5 2.5 2.5s2.5-1.25 2.5-2.5c0-.5-.25-.75-.5-.75s-.5.25-.5.75c0 .5-.25.75-.5.75s-.5-.25-.5-.75v-7z" fill="#000"/>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="#3178c6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#3178c6"/>
    <path d="M12 2v20l10-10L12 2z" fill="#fff"/>
    <text x="6" y="16" fill="#fff" fontSize="8" fontFamily="Arial">TS</text>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="#61dafb" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" fill="#61dafb"/>
    <path d="M12 1c-1.5 0-3 .5-4 1.5C6.5 4 6 5.5 6 7c0 1.5.5 3 1.5 4 1 1 2.5 1.5 4 1.5s3-.5 4-1.5c1.5-1 2-2.5 2-4 0-1.5-.5-3-1.5-4C15 1.5 13.5 1 12 1z" stroke="#61dafb" strokeWidth="1" fill="none"/>
  </svg>
);

const CSSIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1572b6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#1572b6"/>
    <text x="6" y="16" fill="#fff" fontSize="8" fontFamily="Arial">CSS</text>
  </svg>
);

const JSONIcon = () => (
  <svg viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#fff" stroke="#000"/>
    <text x="4" y="16" fill="#000" fontSize="6" fontFamily="monospace">{"{ }"}</text>
  </svg>
);

const DefaultFileIcon = () => (
  <svg viewBox="0 0 24 24" fill="#90caf9" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

// Sample data with different icon scenarios
const sampleData: FolderItemData[] = [
  {
    id: 'src',
    name: 'src',
    isFolder: true,
    children: [
      {
        id: 'components',
        name: 'components',
        isFolder: true,
        children: [
          { id: 'App.tsx', name: 'App.tsx' },
          { id: 'Button.tsx', name: 'Button.tsx' },
          { id: 'Modal.jsx', name: 'Modal.jsx' },
        ]
      },
      {
        id: 'utils',
        name: 'utils',
        isFolder: true,
        children: [
          { id: 'helpers.js', name: 'helpers.js' },
          { id: 'api.ts', name: 'api.ts' },
        ]
      },
      { id: 'index.ts', name: 'index.ts' },
      { id: 'styles.css', name: 'styles.css' },
    ]
  },
  {
    id: 'public',
    name: 'public',
    isFolder: true,
    children: [
      { id: 'index.html', name: 'index.html' },
      { id: 'favicon.ico', name: 'favicon.ico' },
    ]
  },
  { id: 'package.json', name: 'package.json' },
  { id: 'tsconfig.json', name: 'tsconfig.json' },
  { id: 'README.md', name: 'README.md' },
  {
    id: 'special-folder',
    name: 'Special Folder',
    isFolder: true,
    iconKey: 'special', // Using explicit iconKey
    children: [
      {
        id: 'special-file',
        name: 'special-file.txt',
        icon: <span style={{ color: 'red', fontSize: '16px' }}>🔥</span> // Direct icon
      }
    ]
  }
];

const IconExample: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FolderItemData | null>(null);
  const [iconMethod, setIconMethod] = useState<'iconMap' | 'iconResolver' | 'mixed'>('iconMap');

  const handleItemClick = (item: FolderItemData) => {
    setSelectedItem(item);
  };

  // Method 1: Using iconMap with file extension resolver
  const iconMapConfig: IconConfig = {
    iconMap: {
      // File type icons
      'js': <JavaScriptIcon />,
      'jsx': <ReactIcon />,
      'ts': <TypeScriptIcon />,
      'tsx': <ReactIcon />,
      'css': <CSSIcon />,
      'json': <JSONIcon />,
      'folder': <FolderIcon />,
      'special': <span style={{ color: 'purple', fontSize: '16px' }}>⭐</span>,
    },
    getIconKey: createFileExtensionIconResolver({
      'html': 'html',
      'ico': 'image',
      'md': 'markdown',
    }),
    defaultFolderIcon: <FolderIcon />,
    defaultFileIcon: <DefaultFileIcon />,
  };

  // Method 2: Using iconResolver function
  const iconResolverConfig: IconConfig = {
    iconResolver: (item, isExpanded) => {
      const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));
      
      if (isFolder) {
        return isExpanded ? <FolderOpenIcon /> : <FolderIcon />;
      }
      
      // File type detection
      if (item.name.endsWith('.js')) return <JavaScriptIcon />;
      if (item.name.endsWith('.jsx')) return <ReactIcon />;
      if (item.name.endsWith('.ts')) return <TypeScriptIcon />;
      if (item.name.endsWith('.tsx')) return <ReactIcon />;
      if (item.name.endsWith('.css')) return <CSSIcon />;
      if (item.name.endsWith('.json')) return <JSONIcon />;
      
      return <DefaultFileIcon />;
    },
    defaultFolderIcon: <FolderIcon />,
    defaultFileIcon: <DefaultFileIcon />,
  };

  // Method 3: Mixed approach
  const mixedConfig: IconConfig = {
    iconMap: {
      'special': <span style={{ color: 'purple', fontSize: '16px' }}>⭐</span>,
      'js': <JavaScriptIcon />,
      'ts': <TypeScriptIcon />,
    },
    iconResolver: (item, isExpanded) => {
      const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));
      
      if (isFolder) {
        return isExpanded ? <FolderOpenIcon /> : <FolderIcon />;
      }
      
      // Only handle specific cases, let iconMap handle others
      if (item.name.endsWith('.tsx') || item.name.endsWith('.jsx')) {
        return <ReactIcon />;
      }
      
      return null; // Let other methods handle it
    },
    getIconKey: (item) => {
      const extension = item.name.split('.').pop()?.toLowerCase();
      return extension || 'file';
    },
    defaultFolderIcon: <FolderIcon />,
    defaultFileIcon: <DefaultFileIcon />,
  };

  const getCurrentConfig = () => {
    switch (iconMethod) {
      case 'iconMap': return iconMapConfig;
      case 'iconResolver': return iconResolverConfig;
      case 'mixed': return mixedConfig;
      default: return iconMapConfig;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Icon Configuration Examples</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Icon Method:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setIconMethod('iconMap')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: iconMethod === 'iconMap' ? '#007acc' : '#f0f0f0',
              color: iconMethod === 'iconMap' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Icon Map + Extension Resolver
          </button>
          <button 
            onClick={() => setIconMethod('iconResolver')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: iconMethod === 'iconResolver' ? '#007acc' : '#f0f0f0',
              color: iconMethod === 'iconResolver' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Icon Resolver Function
          </button>
          <button 
            onClick={() => setIconMethod('mixed')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: iconMethod === 'mixed' ? '#007acc' : '#f0f0f0',
              color: iconMethod === 'mixed' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Mixed Approach
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>File Tree</h2>
          <div style={{ height: '500px', border: '1px solid #ccc' }}>
            <FolderList
              data={sampleData}
              onItemClick={handleItemClick}
              iconConfig={getCurrentConfig()}
              defaultExpandedIds={['src', 'components', 'special-folder']}
            />
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2>Configuration Details</h2>
          <div style={{ 
            padding: '15px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            marginBottom: '20px'
          }}>
            {iconMethod === 'iconMap' && (
              <div>
                <h4>Icon Map + Extension Resolver</h4>
                <p>Uses an icon map with file extensions as keys, plus a helper function to automatically determine icon keys based on file extensions.</p>
                <ul>
                  <li>Automatic file extension detection</li>
                  <li>Custom extension mapping</li>
                  <li>Explicit iconKey support</li>
                  <li>Default fallback icons</li>
                </ul>
              </div>
            )}
            
            {iconMethod === 'iconResolver' && (
              <div>
                <h4>Icon Resolver Function</h4>
                <p>Uses a custom function to determine icons based on item properties and state.</p>
                <ul>
                  <li>Dynamic icon selection</li>
                  <li>Expanded/collapsed state awareness</li>
                  <li>Custom logic for any file type</li>
                  <li>Full control over icon resolution</li>
                </ul>
              </div>
            )}
            
            {iconMethod === 'mixed' && (
              <div>
                <h4>Mixed Approach</h4>
                <p>Combines icon map, icon resolver, and extension detection for maximum flexibility.</p>
                <ul>
                  <li>Icon map for common types</li>
                  <li>Resolver for special cases</li>
                  <li>Extension detection fallback</li>
                  <li>Priority-based resolution</li>
                </ul>
              </div>
            )}
          </div>
          
          <h2>Selected Item</h2>
          <div style={{ 
            padding: '15px', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            backgroundColor: '#f5f5f5',
            minHeight: '100px'
          }}>
            {selectedItem ? (
              <div>
                <p><strong>Name:</strong> {selectedItem.name}</p>
                <p><strong>ID:</strong> {selectedItem.id}</p>
                <p><strong>Type:</strong> {selectedItem.isFolder ? 'Folder' : 'File'}</p>
                {selectedItem.iconKey && (
                  <p><strong>Icon Key:</strong> {selectedItem.iconKey}</p>
                )}
                {selectedItem.icon && (
                  <p><strong>Direct Icon:</strong> Yes</p>
                )}
              </div>
            ) : (
              <p>Click on an item to see its details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconExample; 