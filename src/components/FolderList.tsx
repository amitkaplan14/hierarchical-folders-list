import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

import { FolderListProps, FolderItemData } from '../types';
import { flattenTree, getVisibleItems } from '../utils/treeUtils';
import { useVirtualization, VirtualizedItem } from '../hooks/useVirtualization';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { FolderItem } from './FolderItem';

const FolderListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  outline: none;
`;

const VirtualContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const FolderList: React.FC<FolderListProps> = ({
  data,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  renderItemContent,
  renderItemIcon,
  itemHeight = 28,
  className,
  style,
  defaultExpandedIds = [],
  keyboard = {
    enabled: true,
    expandOnEnter: true,
    collapseOnEscape: true,
    navigateWithArrows: true,
  },
  virtualizationOptions = {
    enabled: true,
    overscan: 10,
  },
}) => {
  // State for expanded items
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds)
  );
  
  // State for selected item
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Container ref
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Flatten the tree data
  const flattenedItems = useMemo(() => flattenTree(data), [data]);
  
  // Get visible items based on expanded state
  const visibleFlatItems = useMemo(
    () => getVisibleItems(flattenedItems, expandedIds),
    [flattenedItems, expandedIds]
  );
  
  // Virtual list
  const {
    visibleItems: virtualizedItems,
    containerStyle,
    containerRef: virtualContainerRef,
    scrollToIndex,
    scrollItemIntoView,
  } = useVirtualization({
    items: visibleFlatItems,
    itemHeight,
    overscan: virtualizationOptions?.overscan,
    enabled: virtualizationOptions?.enabled,
  });
  
  // Handle item click
  const handleItemClick = useCallback((item: FolderItemData) => {
    setSelectedId(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
  }, [onItemClick]);
  
  // Toggle expand/collapse
  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prevExpandedIds => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }
      return newExpandedIds;
    });
  }, []);
  
  // Keyboard navigation
  useKeyboardNavigation({
    enabled: keyboard?.enabled,
    expandOnEnter: keyboard?.expandOnEnter,
    collapseOnEscape: keyboard?.collapseOnEscape,
    navigateWithArrows: keyboard?.navigateWithArrows,
    visibleItems: visibleFlatItems,
    selectedId,
    expandedIds,
    setSelectedId,
    toggleExpand,
    scrollToIndex,
    scrollItemIntoView,
  });
  
  // Focus the container on mount to enable keyboard navigation
  useEffect(() => {
    if (containerRef.current && keyboard?.enabled) {
      containerRef.current.focus();
    }
  }, [keyboard?.enabled]);
  
  // Combine the virtualization container ref with our ref
  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      virtualContainerRef.current = node;
      if (containerRef.current !== node) {
        containerRef.current = node;
      }
    },
    [virtualContainerRef]
  );

  return (
    <FolderListContainer
      ref={containerRef}
      className={classNames('hierarchical-folder-list', className)}
      style={style}
      tabIndex={0}
    >
      <VirtualContainer
        ref={setRefs}
        style={containerStyle}
      >
        <div style={{ height: `${visibleFlatItems.length * itemHeight}px`, position: 'relative' }}>
          {virtualizedItems.map((virtualItem: VirtualizedItem) => {
            const flatItem = virtualItem;
            const isExpanded = expandedIds.has(flatItem.id);
            const isSelected = selectedId === flatItem.id;
            const depth = flatItem.depth;
            
            return (
              <div
                key={flatItem.id}
                style={virtualItem.style}
              >
                <FolderItem
                  item={flatItem.data}
                  depth={depth}
                  isExpanded={isExpanded}
                  isSelected={isSelected}
                  toggleExpand={toggleExpand}
                  onItemClick={handleItemClick}
                  onItemDoubleClick={onItemDoubleClick}
                  onItemContextMenu={onItemContextMenu}
                  renderItemContent={renderItemContent}
                  renderItemIcon={renderItemIcon}
                  itemHeight={itemHeight}
                />
              </div>
            );
          })}
        </div>
      </VirtualContainer>
    </FolderListContainer>
  );
}; 