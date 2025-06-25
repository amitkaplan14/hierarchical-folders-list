import { FlattenedItem } from '../types';
interface UseVirtualizationProps {
    items: FlattenedItem[];
    itemHeight: number;
    overscan?: number;
    enabled?: boolean;
}
export interface VirtualizedItem extends FlattenedItem {
    style: {
        position: 'absolute';
        top: string;
        left: number;
        width: string;
        height: string;
    };
}
interface UseVirtualizationResult {
    visibleItems: VirtualizedItem[];
    containerStyle: React.CSSProperties;
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollToIndex: (index: number) => void;
}
export declare const useVirtualization: ({ items, itemHeight, overscan, enabled, }: UseVirtualizationProps) => UseVirtualizationResult;
export {};
