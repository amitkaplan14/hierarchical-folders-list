import { FlattenedItem } from '../types';
interface UseKeyboardNavigationProps {
    enabled?: boolean;
    expandOnEnter?: boolean;
    collapseOnEscape?: boolean;
    navigateWithArrows?: boolean;
    visibleItems: FlattenedItem[];
    selectedId: string | null;
    expandedIds: Set<string>;
    setSelectedId: (id: string | null) => void;
    toggleExpand: (id: string) => void;
    scrollToIndex: (index: number) => void;
    scrollItemIntoView: (index: number) => void;
}
export declare const useKeyboardNavigation: ({ enabled, expandOnEnter, collapseOnEscape, navigateWithArrows, visibleItems, selectedId, expandedIds, setSelectedId, toggleExpand, scrollToIndex, scrollItemIntoView, }: UseKeyboardNavigationProps) => void;
export {};
