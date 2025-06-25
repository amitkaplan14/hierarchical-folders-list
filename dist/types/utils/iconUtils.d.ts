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
export declare const resolveIcon: (item: FolderItemData, isExpanded: boolean, iconConfig?: IconConfig, renderItemIcon?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode, defaultFolderIcon?: React.ReactNode, defaultFileIcon?: React.ReactNode) => React.ReactNode;
/**
 * Utility function to get file extension from a filename
 */
export declare const getFileExtension: (filename: string) => string;
/**
 * Common icon key resolver based on file extension
 */
export declare const createFileExtensionIconResolver: (extensionMap?: Record<string, string>) => (item: FolderItemData) => string | null;
