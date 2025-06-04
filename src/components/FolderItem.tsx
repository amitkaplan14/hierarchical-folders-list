import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { FolderItemProps } from '../types';
import { resolveIcon } from '../utils/iconUtils';

const FolderItemContainer = styled.div<{
  depth: number;
  isSelected: boolean;
  isFolder: boolean;
  height: number;
}>`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.depth * 20) + 4}px;
  height: ${props => props.height}px;
  cursor: pointer;
  user-select: none;
  background-color: ${props => props.isSelected ? 'rgba(0, 120, 215, 0.1)' : 'transparent'};
  border-left: ${props => props.isSelected ? '2px solid #0078d7' : '2px solid transparent'};
  
  &:hover {
    background-color: ${props => props.isSelected ? 'rgba(0, 120, 215, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  width: 20px;
  height: 20px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ExpandToggle = styled.div<{ isExpanded: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  transform: rotate(${props => props.isExpanded ? '90deg' : '0deg'});
  transition: transform 0.1s ease;
  
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #555;
  }
`;

const EmptyToggle = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const ItemName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

// Default icons
const DefaultFolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="#ffc107" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const DefaultFileIcon = () => (
  <svg viewBox="0 0 24 24" fill="#90caf9" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

export const FolderItem: React.FC<FolderItemProps> = ({
  item,
  depth,
  isExpanded,
  isSelected,
  toggleExpand,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  renderItemContent,
  renderItemIcon,
  iconConfig,
  itemHeight,
}) => {
  const handleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onItemClick(item);
  }, [onItemClick, item]);

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (onItemDoubleClick) {
      onItemDoubleClick(item);
    }
    if (item.isFolder || (item.children && item.children.length > 0)) {
      toggleExpand(item.id);
    }
  }, [onItemDoubleClick, toggleExpand, item]);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (onItemContextMenu) {
      onItemContextMenu(item, event);
    }
  }, [onItemContextMenu, item]);

  const handleToggleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    toggleExpand(item.id);
  }, [toggleExpand, item.id]);

  const isFolder = Boolean(item.isFolder || (item.children && item.children.length > 0));

  // Get the appropriate icon using the new resolution logic
  const renderIcon = useCallback(() => {
    const resolvedIcon = resolveIcon(
      item,
      isExpanded,
      iconConfig,
      renderItemIcon,
      <DefaultFolderIcon />,
      <DefaultFileIcon />
    );
    
    return resolvedIcon || (isFolder ? <DefaultFolderIcon /> : <DefaultFileIcon />);
  }, [item, isFolder, isExpanded, renderItemIcon, iconConfig]);

  // Render custom content or default
  const content = renderItemContent ? 
    renderItemContent(item, isExpanded) : 
    <ItemName>{item.name}</ItemName>;

  return (
    <FolderItemContainer
      depth={depth}
      isSelected={isSelected}
      isFolder={isFolder}
      height={itemHeight}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      data-item-id={item.id}
    >
      {isFolder ? (
        <ExpandToggle isExpanded={isExpanded} onClick={handleToggleClick} />
      ) : (
        <EmptyToggle />
      )}
      <IconContainer>
        {renderIcon()}
      </IconContainer>
      {content}
    </FolderItemContainer>
  );
}; 