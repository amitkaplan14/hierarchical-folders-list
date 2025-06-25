"use strict";var e=require("react"),t=require("@emotion/styled"),n=require("classnames");function r(e){var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var i=r(e);const l=(e,t=0,n)=>e.reduce((e,r)=>{const i=Boolean(r.isFolder||r.children&&r.children.length>0),o={id:r.id,name:r.name,isFolder:i,depth:t,parentId:n,data:r};return e.push(o),i&&r.children&&r.children.length>0&&e.push(...l(r.children,t+1,r.id)),e},[]),o=(e,t)=>{const n=[],r=new Set([void 0]);for(const i of e)r.has(i.parentId)&&(n.push(i),i.isFolder&&t.has(i.id)&&r.add(i.id));return n},s=(e,t,n)=>{const r=t.findIndex(t=>t.id===e);if(-1===r)return null;return t["down"===n?Math.min(r+1,t.length-1):Math.max(r-1,0)].id},a=({items:t,itemHeight:n,overscan:r=5,enabled:i=!0})=>{const l=e.useRef(null),[o,s]=e.useState({start:0,end:20});t.length;const a=e.useCallback(()=>{if(!l.current||!i)return;const{scrollTop:e,clientHeight:o}=l.current,a=Math.max(0,Math.floor(e/n)-r),d=Math.min(t.length-1,Math.ceil((e+o)/n)+r);s({start:a,end:d})},[n,t.length,r,i]),d=e.useCallback(e=>{if(!l.current||!i)return;const t=e*n;l.current.scrollTop=t},[n,i]),c=e.useCallback(e=>{if(!l.current||!i)return;const t=l.current,r=e*n,o=r+n,s=t.scrollTop,a=s+t.clientHeight;r<s?t.scrollTop=r:o>a&&(t.scrollTop=o-t.clientHeight)},[n,i]);e.useEffect(()=>{if(!i)return;const e=l.current;if(!e)return;const t=()=>{a()};return e.addEventListener("scroll",t),()=>{e.removeEventListener("scroll",t)}},[a,i]),e.useEffect(()=>{if(!i)return;const e=()=>{a()};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[a,i]),e.useEffect(()=>{a()},[a,t]);return{visibleItems:(i?t.slice(o.start,o.end+1):t).map(e=>{const r=t.findIndex(t=>t.id===e.id);return Object.assign(Object.assign({},e),{style:{position:"absolute",top:r*n+"px",left:0,width:"100%",height:`${n}px`}})}),containerStyle:i?{position:"relative",height:"100%",overflow:"auto"}:{},containerRef:l,scrollToIndex:d,scrollItemIntoView:c}},d=({enabled:t=!0,expandOnEnter:n=!0,collapseOnEscape:r=!0,navigateWithArrows:i=!0,visibleItems:l,selectedId:o,expandedIds:a,setSelectedId:d,toggleExpand:c,scrollToIndex:u,scrollItemIntoView:p})=>{const f=e.useCallback(e=>{if(!t||!o)return;const u=l.find(e=>e.id===o);if(u)switch(l.findIndex(e=>e.id===o),e.key){case"ArrowDown":if(!i)return;e.preventDefault();const t=s(o,l,"down");if(t){d(t);const e=l.findIndex(e=>e.id===t);p(e)}break;case"ArrowUp":if(!i)return;e.preventDefault();const f=s(o,l,"up");if(f){d(f);const e=l.findIndex(e=>e.id===f);p(e)}break;case"ArrowRight":if(!i)return;e.preventDefault(),u.isFolder&&!a.has(o)&&c(o);break;case"ArrowLeft":if(!i)return;if(e.preventDefault(),u.isFolder&&a.has(o))c(o);else if(u.parentId){const e=l.find(e=>e.id===u.parentId);if(e){d(e.id);const t=l.findIndex(t=>t.id===e.id);p(t)}}break;case"Enter":if(!n)return;e.preventDefault(),u.isFolder&&c(o);break;case"Escape":if(!r)return;if(e.preventDefault(),u.isFolder&&a.has(o))c(o);else if(u.parentId){const e=l.find(e=>e.id===u.parentId);if(e){d(e.id);const t=l.findIndex(t=>t.id===e.id);p(t)}}}},[t,o,l,a,i,n,r,d,c,p]);e.useEffect(()=>{if(t)return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[t,f])},c=(e,t,n,r,i,l)=>{var o;if(e.icon)return e.icon;if(r){const n=r(e,t);if(n)return n}if(n){if(e.iconKey&&(null===(o=n.iconMap)||void 0===o?void 0:o[e.iconKey]))return n.iconMap[e.iconKey];if(n.getIconKey&&n.iconMap){const t=n.getIconKey(e);if(t&&n.iconMap[t])return n.iconMap[t]}if(n.iconResolver){const r=n.iconResolver(e,t);if(r)return r}const r=Boolean(e.isFolder||e.children&&e.children.length>0);if(r&&n.defaultFolderIcon)return n.defaultFolderIcon;if(!r&&n.defaultFileIcon)return n.defaultFileIcon}const s=Boolean(e.isFolder||e.children&&e.children.length>0);return s&&i?i:!s&&l?l:null},u=e=>{const t=e.lastIndexOf(".");return-1===t||0===t?"":e.substring(t+1).toLowerCase()},p=t.div`
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
`,f=t.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  width: 20px;
  height: 20px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`,h=t.div`
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
`,g=t.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`,m=t.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`,x=()=>i.createElement("svg",{viewBox:"0 0 24 24",fill:"#ffc107",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"})),v=()=>i.createElement("svg",{viewBox:"0 0 24 24",fill:"#90caf9",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"})),b=({item:t,depth:n,isExpanded:r,isSelected:l,toggleExpand:o,onItemClick:s,onItemDoubleClick:a,onItemContextMenu:d,renderItemContent:u,renderItemIcon:b,iconConfig:I,itemHeight:w})=>{const E=e.useCallback(e=>{e.stopPropagation(),s(t)},[s,t]),k=e.useCallback(e=>{e.stopPropagation(),a&&a(t),(t.isFolder||t.children&&t.children.length>0)&&o(t.id)},[a,o,t]),y=e.useCallback(e=>{e.preventDefault(),e.stopPropagation(),d&&d(t,e)},[d,t]),C=e.useCallback(e=>{e.stopPropagation(),o(t.id)},[o,t.id]),F=Boolean(t.isFolder||t.children&&t.children.length>0),M=e.useCallback(()=>c(t,r,I,b,i.createElement(x,null),i.createElement(v,null))||(F?i.createElement(x,null):i.createElement(v,null)),[t,F,r,b,I]),O=u?u(t,r):i.createElement(m,null,t.name);return i.createElement(p,{depth:n,isSelected:l,isFolder:F,height:w,onClick:E,onDoubleClick:k,onContextMenu:y,"data-item-id":t.id},F?i.createElement(h,{isExpanded:r,onClick:C}):i.createElement(g,null),i.createElement(f,null,M()),O)},I=t.div`
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
`,w=t.div`
  position: relative;
  width: 100%;
  height: 100%;
`;exports.FolderItem=b,exports.FolderList=({data:t,onItemClick:r,onItemDoubleClick:s,onItemContextMenu:c,renderItemContent:u,renderItemIcon:p,iconConfig:f,itemHeight:h=28,className:g,style:m,defaultExpandedIds:x=[],keyboard:v={enabled:!0,expandOnEnter:!0,collapseOnEscape:!0,navigateWithArrows:!0},virtualizationOptions:E={enabled:!0,overscan:10}})=>{const[k,y]=e.useState(new Set(x)),[C,F]=e.useState(null),M=e.useRef(null),O=e.useMemo(()=>l(t),[t]),S=e.useMemo(()=>o(O,k),[O,k]),{visibleItems:H,containerStyle:D,containerRef:z,scrollToIndex:L,scrollItemIntoView:T}=a({items:S,itemHeight:h,overscan:null==E?void 0:E.overscan,enabled:null==E?void 0:E.enabled}),A=e.useCallback(e=>{F(e.id),r&&r(e)},[r]),R=e.useCallback(e=>{y(t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[]);d({enabled:null==v?void 0:v.enabled,expandOnEnter:null==v?void 0:v.expandOnEnter,collapseOnEscape:null==v?void 0:v.collapseOnEscape,navigateWithArrows:null==v?void 0:v.navigateWithArrows,visibleItems:S,selectedId:C,expandedIds:k,setSelectedId:F,toggleExpand:R,scrollToIndex:L,scrollItemIntoView:T}),e.useEffect(()=>{M.current&&(null==v?void 0:v.enabled)&&M.current.focus()},[null==v?void 0:v.enabled]);const V=e.useCallback(e=>{z.current=e,M.current!==e&&(M.current=e)},[z]);return i.createElement(I,{ref:M,className:n("hierarchical-folder-list",g),style:m,tabIndex:0},i.createElement(w,{ref:V,style:D},i.createElement("div",{style:{height:S.length*h+"px",position:"relative"}},H.map(e=>{const t=e,n=k.has(t.id),r=C===t.id,l=t.depth;return i.createElement("div",{key:t.id,style:e.style},i.createElement(b,{item:t.data,depth:l,isExpanded:n,isSelected:r,toggleExpand:R,onItemClick:A,onItemDoubleClick:s,onItemContextMenu:c,renderItemContent:u,renderItemIcon:p,iconConfig:f,itemHeight:h}))}))))},exports.createFileExtensionIconResolver=e=>t=>{if(t.isFolder||t.children&&t.children.length>0)return"folder";const n=u(t.name);return n?e&&e[n]?e[n]:n:"file"},exports.flattenTree=l,exports.getFileExtension=u,exports.getVisibleItems=o,exports.resolveIcon=c,exports.useKeyboardNavigation=d,exports.useVirtualization=a;
//# sourceMappingURL=index.js.map
