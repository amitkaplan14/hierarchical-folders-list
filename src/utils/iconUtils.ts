import * as React from 'react';
import { FolderItemData, IconConfig } from '../types';

/**
 * Resolves the appropriate icon for a folder item based on the icon configuration
 * and item properties. This function implements the icon resolution priority:
 * 1. Direct icon on item
 * 2. Icon from iconMap using iconKey
 * 3. Icon from iconMap using getIconKey result
 * 4. Icon from iconResolver function
 * 5. Default folder/file icon from config
 * 6. Built-in default icons
 */
export const resolveIcon = (
  item: FolderItemData,
  isExpanded: boolean,
  iconConfig?: IconConfig,
  renderItemIcon?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode,
  defaultFolderIcon?: React.ReactNode,
  defaultFileIcon?: React.ReactNode
): React.ReactNode => {
  // 1. Direct icon on item (highest priority)
  if (item.icon) {
    return item.icon;
  }

  // 2. Custom renderItemIcon function (legacy support)
  if (renderItemIcon) {
    const customIcon = renderItemIcon(item, isExpanded);
    if (customIcon) {
      return customIcon;
    }
  }

  if (iconConfig) {
    // 3. Icon from iconMap using explicit iconKey
    if (item.iconKey && iconConfig.iconMap?.[item.iconKey]) {
      return iconConfig.iconMap[item.iconKey];
    }

    // 4. Icon from iconMap using getIconKey function
    if (iconConfig.getIconKey && iconConfig.iconMap) {
      const iconKey = iconConfig.getIconKey(item);
      if (iconKey && iconConfig.iconMap[iconKey]) {
        return iconConfig.iconMap[iconKey];
      }
    }

    // 5. Icon from iconResolver function
    if (iconConfig.iconResolver) {
      const resolvedIcon = iconConfig.iconResolver(item, isExpanded);
      if (resolvedIcon) {
        return resolvedIcon;
      }
    }

    // 6. Default icons from config
    const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));
    if (isFolder && iconConfig.defaultFolderIcon) {
      return iconConfig.defaultFolderIcon;
    }
    if (!isFolder && iconConfig.defaultFileIcon) {
      return iconConfig.defaultFileIcon;
    }
  }

  // 7. Built-in default icons (fallback)
  const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));
  if (isFolder && defaultFolderIcon) {
    return defaultFolderIcon;
  }
  if (!isFolder && defaultFileIcon) {
    return defaultFileIcon;
  }

  return null;
};

/**
 * Utility function to get file extension from a filename
 */
export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return '';
  }
  return filename.substring(lastDotIndex + 1).toLowerCase();
};

/**
 * Common icon key resolver based on file extension
 */
export const createFileExtensionIconResolver = (extensionMap?: Record<string, string>) => {
  return (item: FolderItemData): string | null => {
    if (item.isFolder || (item.children && item.children.length > 0)) {
      return 'folder';
    }
    
    const extension = getFileExtension(item.name);
    if (!extension) {
      return 'file';
    }
    
    // Check custom extension mapping first
    if (extensionMap && extensionMap[extension]) {
      return extensionMap[extension];
    }
    
    // Return the extension as the icon key
    return extension;
  };
}; 