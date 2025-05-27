import { useCallback, useEffect } from 'react';
import { FlattenedItem } from '../types';
import { getNextItemId } from '../utils/treeUtils';

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
}

export const useKeyboardNavigation = ({
  enabled = true,
  expandOnEnter = true,
  collapseOnEscape = true,
  navigateWithArrows = true,
  visibleItems,
  selectedId,
  expandedIds,
  setSelectedId,
  toggleExpand,
  scrollToIndex,
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !selectedId) return;

    const selectedItem = visibleItems.find(item => item.id === selectedId);
    if (!selectedItem) return;

    const currentIndex = visibleItems.findIndex(item => item.id === selectedId);

    switch (event.key) {
      case 'ArrowDown':
        if (!navigateWithArrows) return;
        event.preventDefault();
        
        const nextId = getNextItemId(selectedId, visibleItems, 'down');
        if (nextId) {
          setSelectedId(nextId);
          scrollToIndex(currentIndex + 1);
        }
        break;
        
      case 'ArrowUp':
        if (!navigateWithArrows) return;
        event.preventDefault();
        
        const prevId = getNextItemId(selectedId, visibleItems, 'up');
        if (prevId) {
          setSelectedId(prevId);
          scrollToIndex(currentIndex - 1);
        }
        break;
        
      case 'ArrowRight':
        if (!navigateWithArrows) return;
        event.preventDefault();
        
        // If folder is not expanded, expand it
        if (selectedItem.isFolder && !expandedIds.has(selectedId)) {
          toggleExpand(selectedId);
        }
        break;
        
      case 'ArrowLeft':
        if (!navigateWithArrows) return;
        event.preventDefault();
        
        // If folder is expanded, collapse it
        if (selectedItem.isFolder && expandedIds.has(selectedId)) {
          toggleExpand(selectedId);
        } 
        // If not a folder or already collapsed, go to parent
        else if (selectedItem.parentId) {
          const parentItem = visibleItems.find(item => item.id === selectedItem.parentId);
          if (parentItem) {
            setSelectedId(parentItem.id);
            const parentIndex = visibleItems.findIndex(item => item.id === parentItem.id);
            scrollToIndex(parentIndex);
          }
        }
        break;
        
      case 'Enter':
        if (!expandOnEnter) return;
        event.preventDefault();
        
        if (selectedItem.isFolder) {
          toggleExpand(selectedId);
        }
        break;
        
      case 'Escape':
        if (!collapseOnEscape) return;
        event.preventDefault();
        
        // If folder is expanded, collapse it
        if (selectedItem.isFolder && expandedIds.has(selectedId)) {
          toggleExpand(selectedId);
        }
        // Otherwise, go to parent if possible
        else if (selectedItem.parentId) {
          const parentItem = visibleItems.find(item => item.id === selectedItem.parentId);
          if (parentItem) {
            setSelectedId(parentItem.id);
            const parentIndex = visibleItems.findIndex(item => item.id === parentItem.id);
            scrollToIndex(parentIndex);
          }
        }
        break;
    }
  }, [
    enabled, 
    selectedId, 
    visibleItems, 
    expandedIds,
    navigateWithArrows,
    expandOnEnter,
    collapseOnEscape,
    setSelectedId, 
    toggleExpand,
    scrollToIndex
  ]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [enabled, handleKeyDown]);
}; 