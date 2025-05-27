import { useState, useEffect, useRef, useCallback } from 'react';
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

export const useVirtualization = ({
  items,
  itemHeight,
  overscan = 5,
  enabled = true,
}: UseVirtualizationProps): UseVirtualizationResult => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });

  const totalHeight = items.length * itemHeight;

  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current || !enabled) return;

    const { scrollTop, clientHeight } = containerRef.current;
    
    // Calculate the visible range
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + clientHeight) / itemHeight) + overscan
    );

    setVisibleRange({ start: startIndex, end: endIndex });
  }, [itemHeight, items.length, overscan, enabled]);

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current || !enabled) return;
    
    const scrollTop = index * itemHeight;
    containerRef.current.scrollTop = scrollTop;
  }, [itemHeight, enabled]);

  // Handle scroll events
  useEffect(() => {
    if (!enabled) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      calculateVisibleRange();
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [calculateVisibleRange, enabled]);

  // Recalculate on resize
  useEffect(() => {
    if (!enabled) return;
    
    const handleResize = () => {
      calculateVisibleRange();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateVisibleRange, enabled]);

  // Calculate initial visible range
  useEffect(() => {
    calculateVisibleRange();
  }, [calculateVisibleRange, items]);

  // Get the visible items
  const visibleItems = enabled
    ? items.slice(visibleRange.start, visibleRange.end + 1)
    : items;

  // Style for container
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: '100%',
    overflow: 'auto',
  };

  // Style for the inner content
  const innerStyle: React.CSSProperties = {
    height: `${totalHeight}px`,
    position: 'relative',
  };

  // Add transforms to position the visible items
  const itemsWithPosition: VirtualizedItem[] = visibleItems.map(item => {
    const index = items.findIndex(i => i.id === item.id);
    return {
      ...item,
      style: {
        position: 'absolute',
        top: `${index * itemHeight}px`,
        left: 0,
        width: '100%',
        height: `${itemHeight}px`,
      },
    };
  });

  return {
    visibleItems: itemsWithPosition,
    containerStyle: enabled ? containerStyle : {},
    containerRef,
    scrollToIndex,
  };
}; 