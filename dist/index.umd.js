!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("@emotion/styled"),require("classnames")):"function"==typeof define&&define.amd?define(["exports","react","@emotion/styled","classnames"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).HierarchicalFoldersList={},e.React,e.emotionStyled,e.classNames)}(this,function(e,t,n,r){"use strict";function i(e){var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var l=i(t);const o=(e,t=0,n)=>e.reduce((e,r)=>{const i=Boolean(r.isFolder||r.children&&r.children.length>0),l={id:r.id,name:r.name,isFolder:i,depth:t,parentId:n,data:r};return e.push(l),i&&r.children&&r.children.length>0&&e.push(...o(r.children,t+1,r.id)),e},[]),s=(e,t)=>{const n=[],r=new Set([void 0]);for(const i of e)r.has(i.parentId)&&(n.push(i),i.isFolder&&t.has(i.id)&&r.add(i.id));return n},a=(e,t,n)=>{const r=t.findIndex(t=>t.id===e);if(-1===r)return null;return t["down"===n?Math.min(r+1,t.length-1):Math.max(r-1,0)].id},d=({items:e,itemHeight:n,overscan:r=5,enabled:i=!0})=>{const l=t.useRef(null),[o,s]=t.useState({start:0,end:20});e.length;const a=t.useCallback(()=>{if(!l.current||!i)return;const{scrollTop:t,clientHeight:o}=l.current,a=Math.max(0,Math.floor(t/n)-r),d=Math.min(e.length-1,Math.ceil((t+o)/n)+r);s({start:a,end:d})},[n,e.length,r,i]),d=t.useCallback(e=>{if(!l.current||!i)return;const t=e*n;l.current.scrollTop=t},[n,i]),c=t.useCallback(e=>{if(!l.current||!i)return;const t=l.current,r=e*n,o=r+n,s=t.scrollTop,a=s+t.clientHeight;r<s?t.scrollTop=r:o>a&&(t.scrollTop=o-t.clientHeight)},[n,i]);t.useEffect(()=>{if(!i)return;const e=l.current;if(!e)return;const t=()=>{a()};return e.addEventListener("scroll",t),()=>{e.removeEventListener("scroll",t)}},[a,i]),t.useEffect(()=>{if(!i)return;const e=()=>{a()};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[a,i]),t.useEffect(()=>{a()},[a,e]);return{visibleItems:(i?e.slice(o.start,o.end+1):e).map(t=>{const r=e.findIndex(e=>e.id===t.id);return Object.assign(Object.assign({},t),{style:{position:"absolute",top:r*n+"px",left:0,width:"100%",height:`${n}px`}})}),containerStyle:i?{position:"relative",height:"100%",overflow:"auto"}:{},containerRef:l,scrollToIndex:d,scrollItemIntoView:c}},c=({enabled:e=!0,expandOnEnter:n=!0,collapseOnEscape:r=!0,navigateWithArrows:i=!0,visibleItems:l,selectedId:o,expandedIds:s,setSelectedId:d,toggleExpand:c,scrollToIndex:u,scrollItemIntoView:f})=>{const p=t.useCallback(t=>{if(!e||!o)return;const u=l.find(e=>e.id===o);if(u)switch(l.findIndex(e=>e.id===o),t.key){case"ArrowDown":if(!i)return;t.preventDefault();const e=a(o,l,"down");if(e){d(e);const t=l.findIndex(t=>t.id===e);f(t)}break;case"ArrowUp":if(!i)return;t.preventDefault();const p=a(o,l,"up");if(p){d(p);const e=l.findIndex(e=>e.id===p);f(e)}break;case"ArrowRight":if(!i)return;t.preventDefault(),u.isFolder&&!s.has(o)&&c(o);break;case"ArrowLeft":if(!i)return;if(t.preventDefault(),u.isFolder&&s.has(o))c(o);else if(u.parentId){const e=l.find(e=>e.id===u.parentId);if(e){d(e.id);const t=l.findIndex(t=>t.id===e.id);f(t)}}break;case"Enter":if(!n)return;t.preventDefault(),u.isFolder&&c(o);break;case"Escape":if(!r)return;if(t.preventDefault(),u.isFolder&&s.has(o))c(o);else if(u.parentId){const e=l.find(e=>e.id===u.parentId);if(e){d(e.id);const t=l.findIndex(t=>t.id===e.id);f(t)}}}},[e,o,l,s,i,n,r,d,c,f]);t.useEffect(()=>{if(e)return window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}},[e,p])},u=(e,t,n,r,i,l)=>{var o;if(e.icon)return e.icon;if(r){const n=r(e,t);if(n)return n}if(n){if(e.iconKey&&(null===(o=n.iconMap)||void 0===o?void 0:o[e.iconKey]))return n.iconMap[e.iconKey];if(n.getIconKey&&n.iconMap){const t=n.getIconKey(e);if(t&&n.iconMap[t])return n.iconMap[t]}if(n.iconResolver){const r=n.iconResolver(e,t);if(r)return r}const r=Boolean(e.isFolder||e.children&&e.children.length>0);if(r&&n.defaultFolderIcon)return n.defaultFolderIcon;if(!r&&n.defaultFileIcon)return n.defaultFileIcon}const s=Boolean(e.isFolder||e.children&&e.children.length>0);return s&&i?i:!s&&l?l:null},f=e=>{const t=e.lastIndexOf(".");return-1===t||0===t?"":e.substring(t+1).toLowerCase()},p=n.div`
  display: flex;
  align-items: center;
  padding-left: ${e=>20*e.depth+4}px;
  height: ${e=>e.height}px;
  cursor: pointer;
  user-select: none;
  background-color: ${e=>e.isSelected?"rgba(0, 120, 215, 0.1)":"transparent"};
  border-left: ${e=>e.isSelected?"2px solid #0078d7":"2px solid transparent"};
  
  &:hover {
    background-color: ${e=>e.isSelected?"rgba(0, 120, 215, 0.2)":"rgba(0, 0, 0, 0.05)"};
  }
`,h=n.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  width: 20px;
  height: 20px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`,m=n.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  transform: rotate(${e=>e.isExpanded?"90deg":"0deg"});
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
`,g=n.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`,v=n.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`,x=()=>l.createElement("svg",{viewBox:"0 0 24 24",fill:"#ffc107",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"})),b=()=>l.createElement("svg",{viewBox:"0 0 24 24",fill:"#90caf9",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"})),I=({item:e,depth:n,isExpanded:r,isSelected:i,toggleExpand:o,onItemClick:s,onItemDoubleClick:a,onItemContextMenu:d,renderItemContent:c,renderItemIcon:f,iconConfig:I,itemHeight:w})=>{const E=t.useCallback(t=>{t.stopPropagation(),s(e)},[s,e]),y=t.useCallback(t=>{t.stopPropagation(),a&&a(e),(e.isFolder||e.children&&e.children.length>0)&&o(e.id)},[a,o,e]),k=t.useCallback(t=>{t.preventDefault(),t.stopPropagation(),d&&d(e,t)},[d,e]),C=t.useCallback(t=>{t.stopPropagation(),o(e.id)},[o,e.id]),F=Boolean(e.isFolder||e.children&&e.children.length>0),M=t.useCallback(()=>u(e,r,I,f,l.createElement(x,null),l.createElement(b,null))||(F?l.createElement(x,null):l.createElement(b,null)),[e,F,r,f,I]),S=c?c(e,r):l.createElement(v,null,e.name);return l.createElement(p,{depth:n,isSelected:i,isFolder:F,height:w,onClick:E,onDoubleClick:y,onContextMenu:k,"data-item-id":e.id},F?l.createElement(m,{isExpanded:r,onClick:C}):l.createElement(g,null),l.createElement(h,null,M()),S)},w=n.div`
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
`,E=n.div`
  position: relative;
  width: 100%;
  height: 100%;
`;e.FolderItem=I,e.FolderList=({data:e,onItemClick:n,onItemDoubleClick:i,onItemContextMenu:a,renderItemContent:u,renderItemIcon:f,iconConfig:p,itemHeight:h=28,className:m,style:g,defaultExpandedIds:v=[],keyboard:x={enabled:!0,expandOnEnter:!0,collapseOnEscape:!0,navigateWithArrows:!0},virtualizationOptions:b={enabled:!0,overscan:10}})=>{const[y,k]=t.useState(new Set(v)),[C,F]=t.useState(null),M=t.useRef(null),S=t.useMemo(()=>o(e),[e]),O=t.useMemo(()=>s(S,y),[S,y]),{visibleItems:H,containerStyle:D,containerRef:L,scrollToIndex:z,scrollItemIntoView:T}=d({items:O,itemHeight:h,overscan:null==b?void 0:b.overscan,enabled:null==b?void 0:b.enabled}),R=t.useCallback(e=>{F(e.id),n&&n(e)},[n]),j=t.useCallback(e=>{k(t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[]);c({enabled:null==x?void 0:x.enabled,expandOnEnter:null==x?void 0:x.expandOnEnter,collapseOnEscape:null==x?void 0:x.collapseOnEscape,navigateWithArrows:null==x?void 0:x.navigateWithArrows,visibleItems:O,selectedId:C,expandedIds:y,setSelectedId:F,toggleExpand:j,scrollToIndex:z,scrollItemIntoView:T}),t.useEffect(()=>{M.current&&(null==x?void 0:x.enabled)&&M.current.focus()},[null==x?void 0:x.enabled]);const A=t.useCallback(e=>{L.current=e,M.current!==e&&(M.current=e)},[L]);return l.createElement(w,{ref:M,className:r("hierarchical-folder-list",m),style:g,tabIndex:0},l.createElement(E,{ref:A,style:D},l.createElement("div",{style:{height:O.length*h+"px",position:"relative"}},H.map(e=>{const t=e,n=y.has(t.id),r=C===t.id,o=t.depth;return l.createElement("div",{key:t.id,style:e.style},l.createElement(I,{item:t.data,depth:o,isExpanded:n,isSelected:r,toggleExpand:j,onItemClick:R,onItemDoubleClick:i,onItemContextMenu:a,renderItemContent:u,renderItemIcon:f,iconConfig:p,itemHeight:h}))}))))},e.createFileExtensionIconResolver=e=>t=>{if(t.isFolder||t.children&&t.children.length>0)return"folder";const n=f(t.name);return n?e&&e[n]?e[n]:n:"file"},e.flattenTree=o,e.getFileExtension=f,e.getVisibleItems=s,e.resolveIcon=u,e.useKeyboardNavigation=c,e.useVirtualization=d});
//# sourceMappingURL=index.umd.js.map
