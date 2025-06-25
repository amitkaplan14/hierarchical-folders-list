import { FolderItemData, FlattenedItem } from '../types';
/**
 * Flattens a nested tree structure into a flat array
 */
export declare const flattenTree: (data: FolderItemData[], depth?: number, parentId?: string) => FlattenedItem[];
/**
 * Gets the visible items based on expanded state
 */
export declare const getVisibleItems: (flattenedItems: FlattenedItem[], expandedIds: Set<string>) => FlattenedItem[];
/**
 * Gets the next or previous item for keyboard navigation
 */
export declare const getNextItemId: (currentId: string, visibleItems: FlattenedItem[], direction: "up" | "down") => string | null;
/**
 * Gets all children ids of a folder (recursively)
 */
export declare const getAllChildrenIds: (flattenedItems: FlattenedItem[], folderId: string) => string[];
