# Hierarchical Folders List

A React component for displaying hierarchical folder structures with virtualization, keyboard navigation, and customizable styling.

## Features

- 🚀 **DOM Virtualization**: Only renders items visible in the viewport for optimal performance
- ⌨️ **Keyboard Navigation**: Full keyboard support (arrows, enter, escape) 
- 🎨 **Customizable Styling**: Easily style and customize with Emotion
- 🔧 **Flexible API**: Render custom item content and icons
- 🌲 **Tree View**: Familiar folder tree navigation like in Windows/Mac
- 📦 **Small Bundle Size**: Lightweight with minimal dependencies

## Installation

```bash
npm install hierarchical-folders-list
# or
yarn add hierarchical-folders-list
```

## Usage

```jsx
import React from 'react';
import { FolderList } from 'hierarchical-folders-list';

// Sample data
const folderData = [
  {
    id: 'folder-1',
    name: 'Documents',
    isFolder: true,
    children: [
      {
        id: 'folder-1-1',
        name: 'Work',
        isFolder: true,
        children: [
          { id: 'file-1-1-1', name: 'Report.pdf' },
          { id: 'file-1-1-2', name: 'Presentation.pptx' }
        ]
      },
      { id: 'file-1-1', name: 'Resume.docx' }
    ]
  },
  {
    id: 'folder-2',
    name: 'Pictures',
    isFolder: true,
    children: [
      { id: 'file-2-1', name: 'Vacation.jpg' },
      { id: 'file-2-2', name: 'Family.png' }
    ]
  }
];

const App = () => {
  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
  };

  return (
    <div style={{ height: '400px', width: '300px' }}>
      <FolderList
        data={folderData}
        onItemClick={handleItemClick}
        defaultExpandedIds={['folder-1']}
      />
    </div>
  );
};

export default App;
```

## Keyboard Navigation

The component supports the following keyboard shortcuts:

- **Up/Down Arrows**: Navigate between items
- **Right Arrow**: Expand folder or navigate to first child
- **Left Arrow**: Collapse folder or navigate to parent
- **Enter**: Toggle folder expansion
- **Escape**: Collapse folder or navigate to parent

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `FolderItemData[]` | Required | Array of folder/file items to display |
| `onItemClick` | `(item: FolderItemData) => void` | - | Callback when an item is clicked |
| `onItemDoubleClick` | `(item: FolderItemData) => void` | - | Callback when an item is double-clicked |
| `onItemContextMenu` | `(item: FolderItemData, event: React.MouseEvent) => void` | - | Callback for context menu events |
| `renderItemContent` | `(item: FolderItemData, isExpanded: boolean) => React.ReactNode` | - | Custom renderer for item content |
| `renderItemIcon` | `(item: FolderItemData, isExpanded: boolean) => React.ReactNode` | - | Custom renderer for item icons |
| `itemHeight` | `number` | `28` | Height of each item in pixels |
| `className` | `string` | - | Additional CSS class for the container |
| `style` | `React.CSSProperties` | - | Additional inline styles for the container |
| `defaultExpandedIds` | `string[]` | `[]` | IDs of items that should be expanded by default |
| `keyboard` | `Object` | See below | Keyboard navigation options |
| `virtualizationOptions` | `Object` | See below | Virtualization options |

### Keyboard Options

```js
{
  enabled: true,             // Enable keyboard navigation
  expandOnEnter: true,       // Expand folders with Enter key
  collapseOnEscape: true,    // Collapse folders with Escape key
  navigateWithArrows: true   // Navigate with arrow keys
}
```

### Virtualization Options

```js
{
  enabled: true,             // Enable virtualization
  overscan: 10               // Number of items to render outside viewport
}
```

## Types

```ts
interface FolderItemData {
  id: string;
  name: string;
  children?: FolderItemData[];
  isFolder?: boolean;
  icon?: React.ReactNode;
  customData?: any;
}
```

## Example

To run the example locally:

1. Clone this repository
2. Build the package: `npm run build`
3. Serve the example: `npx http-server`
4. Navigate to `http://localhost:8080/example/index.html`

## License

MIT 