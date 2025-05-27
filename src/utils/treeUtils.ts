import { FolderItemData, FlattenedItem } from '../types';

/**
 * Flattens a nested tree structure into a flat array
 */
export const flattenTree = (
  data: FolderItemData[],
  depth = 0,
  parentId?: string
): FlattenedItem[] => {
  return data.reduce<FlattenedItem[]>((acc, item) => {
    const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));
    const flatItem: FlattenedItem = {
      id: item.id,
      name: item.name,
      isFolder,
      depth,
      parentId,
      data: item,
    };

    acc.push(flatItem);

    if (isFolder && item.children && item.children.length > 0) {
      acc.push(...flattenTree(item.children, depth + 1, item.id));
    }

    return acc;
  }, []);
};

/**
 * Gets the visible items based on expanded state
 */
export const getVisibleItems = (
  flattenedItems: FlattenedItem[],
  expandedIds: Set<string>
): FlattenedItem[] => {
  const visibleItems: FlattenedItem[] = [];
  const isVisible = new Set<string | undefined>([undefined]); // undefined represents the root level

  for (const item of flattenedItems) {
    if (isVisible.has(item.parentId)) {
      visibleItems.push(item);
      
      // If this item is expanded, its children will be visible
      if (item.isFolder && expandedIds.has(item.id)) {
        isVisible.add(item.id);
      }
    }
  }

  return visibleItems;
};

/**
 * Gets the next or previous item for keyboard navigation
 */
export const getNextItemId = (
  currentId: string, 
  visibleItems: FlattenedItem[], 
  direction: 'up' | 'down'
): string | null => {
  const currentIndex = visibleItems.findIndex(item => item.id === currentId);
  if (currentIndex === -1) return null;

  const nextIndex = direction === 'down' ? 
    Math.min(currentIndex + 1, visibleItems.length - 1) : 
    Math.max(currentIndex - 1, 0);

  return visibleItems[nextIndex].id;
};

/**
 * Gets all children ids of a folder (recursively)
 */
export const getAllChildrenIds = (
  flattenedItems: FlattenedItem[],
  folderId: string
): string[] => {
  const childrenIds: string[] = [];
  
  for (const item of flattenedItems) {
    if (item.parentId === folderId) {
      childrenIds.push(item.id);
      
      if (item.isFolder) {
        childrenIds.push(...getAllChildrenIds(flattenedItems, item.id));
      }
    }
  }
  
  return childrenIds;
}; 