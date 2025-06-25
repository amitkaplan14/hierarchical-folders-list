export interface FolderItemData {
    id: string;
    name: string;
    children?: FolderItemData[];
    isFolder?: boolean;
    icon?: React.ReactNode;
    customData?: any;
}
export interface FolderListProps {
    data: FolderItemData[];
    onItemClick?: (item: FolderItemData) => void;
    onItemDoubleClick?: (item: FolderItemData) => void;
    onItemContextMenu?: (item: FolderItemData, event: React.MouseEvent) => void;
    renderItemContent?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
    renderItemIcon?: (item: FolderItemData, isExpanded: boolean) => React.ReactNode;
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
