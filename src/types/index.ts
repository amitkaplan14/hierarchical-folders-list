export interface FolderItemData {
  id: string;
  name: string;
  children?: FolderItemData[];
  isFolder?: boolean;
  icon?: React.ReactNode;
  iconKey?: string;
  customData?: any;
}

export interface IconConfig {
  iconMap?: Record<string, React.ReactNode>;
  iconResolver?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode | null;
  defaultFolderIcon?: React.ReactNode;
  defaultFileIcon?: React.ReactNode;
  getIconKey?: (item: FolderItemData) => string | null;
}

export interface FolderListProps {
  data: FolderItemData[];
  onItemClick?: (item: FolderItemData) => void;
  onItemDoubleClick?: (item: FolderItemData) => void;
  onItemContextMenu?: (item: FolderItemData, event: React.MouseEvent) => void;
  renderItemContent?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
  renderItemIcon?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
  iconConfig?: IconConfig;
  itemHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  defaultExpandedIds?: string[];
  keyboard?: {
    enabled?: boolean;
    expandOnEnter?: boolean;
    collapseOnEscape?: boolean;
    navigateWithArrows?: boolean;
  };
  virtualizationOptions?: {
    enabled?: boolean;
    overscan?: number;
  };
}

export interface FolderItemProps {
  item: FolderItemData;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
  toggleExpand: (id: string) => void;
  onItemClick: (item: FolderItemData) => void;
  onItemDoubleClick?: (item: FolderItemData) => void;
  onItemContextMenu?: (item: FolderItemData, event: React.MouseEvent) => void;
  renderItemContent?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
  renderItemIcon?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
  iconConfig?: IconConfig;
  itemHeight: number;
}

export interface FlattenedItem {
  id: string;
  name: string;
  isFolder: boolean;
  depth: number;
  parentId?: string;
  data: FolderItemData;
} 