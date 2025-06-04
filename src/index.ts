// Export main component
export { FolderList } from './components/FolderList';
export { FolderItem } from './components/FolderItem';

// Export types
export * from './types';

// Export utilities
export { flattenTree, getVisibleItems } from './utils/treeUtils';
export { resolveIcon, getFileExtension, createFileExtensionIconResolver } from './utils/iconUtils';

// Export hooks
export { useVirtualization } from './hooks/useVirtualization';
export { useKeyboardNavigation } from './hooks/useKeyboardNavigation'; 