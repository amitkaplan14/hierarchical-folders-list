import*as e from"react";import{useRef as t,useState as n,useCallback as r,useEffect as i,useMemo as o}from"react";import l from"@emotion/styled";import d from"classnames";const s=(e,t=0,n)=>e.reduce((e,r)=>{const i=Boolean(r.isFolder||r.children&&r.children.length>0),o={id:r.id,name:r.name,isFolder:i,depth:t,parentId:n,data:r};return e.push(o),i&&r.children&&r.children.length>0&&e.push(...s(r.children,t+1,r.id)),e},[]),a=(e,t)=>{const n=[],r=new Set([void 0]);for(const i of e)r.has(i.parentId)&&(n.push(i),i.isFolder&&t.has(i.id)&&r.add(i.id));return n},c=(e,t,n)=>{const r=t.findIndex(t=>t.id===e);if(-1===r)return null;return t["down"===n?Math.min(r+1,t.length-1):Math.max(r-1,0)].id},p=({items:e,itemHeight:o,overscan:l=5,enabled:d=!0})=>{const s=t(null),[a,c]=n({start:0,end:20});e.length;const p=r(()=>{if(!s.current||!d)return;const{scrollTop:t,clientHeight:n}=s.current,r=Math.max(0,Math.floor(t/o)-l),i=Math.min(e.length-1,Math.ceil((t+n)/o)+l);c({start:r,end:i})},[o,e.length,l,d]),h=r(e=>{if(!s.current||!d)return;const t=e*o;s.current.scrollTop=t},[o,d]),u=r(e=>{if(!s.current||!d)return;const t=s.current,n=e*o,r=n+o,i=t.scrollTop,l=i+t.clientHeight;n<i?t.scrollTop=n:r>l&&(t.scrollTop=r-t.clientHeight)},[o,d]);i(()=>{if(!d)return;const e=s.current;if(!e)return;const t=()=>{p()};return e.addEventListener("scroll",t),()=>{e.removeEventListener("scroll",t)}},[p,d]),i(()=>{if(!d)return;const e=()=>{p()};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[p,d]),i(()=>{p()},[p,e]);return{visibleItems:(d?e.slice(a.start,a.end+1):e).map(t=>{const n=e.findIndex(e=>e.id===t.id);return Object.assign(Object.assign({},t),{style:{position:"absolute",top:n*o+"px",left:0,width:"100%",height:`${o}px`}})}),containerStyle:d?{position:"relative",height:"100%",overflow:"auto"}:{},containerRef:s,scrollToIndex:h,scrollItemIntoView:u}},h=({enabled:e=!0,expandOnEnter:t=!0,collapseOnEscape:n=!0,navigateWithArrows:o=!0,visibleItems:l,selectedId:d,expandedIds:s,setSelectedId:a,toggleExpand:p,scrollToIndex:h,scrollItemIntoView:u})=>{const f=r(r=>{if(!e||!d)return;const i=l.find(e=>e.id===d);if(i)switch(l.findIndex(e=>e.id===d),r.key){case"ArrowDown":if(!o)return;r.preventDefault();const e=c(d,l,"down");if(e){a(e);const t=l.findIndex(t=>t.id===e);u(t)}break;case"ArrowUp":if(!o)return;r.preventDefault();const h=c(d,l,"up");if(h){a(h);const e=l.findIndex(e=>e.id===h);u(e)}break;case"ArrowRight":if(!o)return;r.preventDefault(),i.isFolder&&!s.has(d)&&p(d);break;case"ArrowLeft":if(!o)return;if(r.preventDefault(),i.isFolder&&s.has(d))p(d);else if(i.parentId){const e=l.find(e=>e.id===i.parentId);if(e){a(e.id);const t=l.findIndex(t=>t.id===e.id);u(t)}}break;case"Enter":if(!t)return;r.preventDefault(),i.isFolder&&p(d);break;case"Escape":if(!n)return;if(r.preventDefault(),i.isFolder&&s.has(d))p(d);else if(i.parentId){const e=l.find(e=>e.id===i.parentId);if(e){a(e.id);const t=l.findIndex(t=>t.id===e.id);u(t)}}}},[e,d,l,s,o,t,n,a,p,u]);i(()=>{if(e)return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[e,f])},u=(e,t,n,r,i,o)=>{var l;if(e.icon)return e.icon;if(r){const n=r(e,t);if(n)return n}if(n){if(e.iconKey&&(null===(l=n.iconMap)||void 0===l?void 0:l[e.iconKey]))return n.iconMap[e.iconKey];if(n.getIconKey&&n.iconMap){const t=n.getIconKey(e);if(t&&n.iconMap[t])return n.iconMap[t]}if(n.iconResolver){const r=n.iconResolver(e,t);if(r)return r}const r=Boolean(e.isFolder||e.children&&e.children.length>0);if(r&&n.defaultFolderIcon)return n.defaultFolderIcon;if(!r&&n.defaultFileIcon)return n.defaultFileIcon}const d=Boolean(e.isFolder||e.children&&e.children.length>0);return d&&i?i:!d&&o?o:null},f=e=>{const t=e.lastIndexOf(".");return-1===t||0===t?"":e.substring(t+1).toLowerCase()},m=e=>t=>{if(t.isFolder||t.children&&t.children.length>0)return"folder";const n=f(t.name);return n?e&&e[n]?e[n]:n:"file"},g=l.div`
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
`,v=l.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  width: 20px;
  height: 20px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`,x=l.div`
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
`,I=l.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`,w=l.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`,b=()=>e.createElement("svg",{viewBox:"0 0 24 24",fill:"#ffc107",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"})),E=()=>e.createElement("svg",{viewBox:"0 0 24 24",fill:"#90caf9",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"})),y=({item:t,depth:n,isExpanded:i,isSelected:o,toggleExpand:l,onItemClick:d,onItemDoubleClick:s,onItemContextMenu:a,renderItemContent:c,renderItemIcon:p,iconConfig:h,itemHeight:f})=>{const m=r(e=>{e.stopPropagation(),d(t)},[d,t]),y=r(e=>{e.stopPropagation(),s&&s(t),(t.isFolder||t.children&&t.children.length>0)&&l(t.id)},[s,l,t]),k=r(e=>{e.preventDefault(),e.stopPropagation(),a&&a(t,e)},[a,t]),C=r(e=>{e.stopPropagation(),l(t.id)},[l,t.id]),F=Boolean(t.isFolder||t.children&&t.children.length>0),M=r(()=>u(t,i,h,p,e.createElement(b,null),e.createElement(E,null))||(F?e.createElement(b,null):e.createElement(E,null)),[t,F,i,p,h]),H=c?c(t,i):e.createElement(w,null,t.name);return e.createElement(g,{depth:n,isSelected:o,isFolder:F,height:f,onClick:m,onDoubleClick:y,onContextMenu:k,"data-item-id":t.id},F?e.createElement(x,{isExpanded:i,onClick:C}):e.createElement(I,null),e.createElement(v,null,M()),H)},k=l.div`
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
`,C=l.div`
  position: relative;
  width: 100%;
  height: 100%;
`,F=({data:l,onItemClick:c,onItemDoubleClick:u,onItemContextMenu:f,renderItemContent:m,renderItemIcon:g,iconConfig:v,itemHeight:x=28,className:I,style:w,defaultExpandedIds:b=[],keyboard:E={enabled:!0,expandOnEnter:!0,collapseOnEscape:!0,navigateWithArrows:!0},virtualizationOptions:F={enabled:!0,overscan:10}})=>{const[M,H]=n(new Set(b)),[S,D]=n(null),O=t(null),L=o(()=>s(l),[l]),z=o(()=>a(L,M),[L,M]),{visibleItems:A,containerStyle:T,containerRef:B,scrollToIndex:V,scrollItemIntoView:$}=p({items:z,itemHeight:x,overscan:null==F?void 0:F.overscan,enabled:null==F?void 0:F.enabled}),R=r(e=>{D(e.id),c&&c(e)},[c]),K=r(e=>{H(t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[]);h({enabled:null==E?void 0:E.enabled,expandOnEnter:null==E?void 0:E.expandOnEnter,collapseOnEscape:null==E?void 0:E.collapseOnEscape,navigateWithArrows:null==E?void 0:E.navigateWithArrows,visibleItems:z,selectedId:S,expandedIds:M,setSelectedId:D,toggleExpand:K,scrollToIndex:V,scrollItemIntoView:$}),i(()=>{O.current&&(null==E?void 0:E.enabled)&&O.current.focus()},[null==E?void 0:E.enabled]);const P=r(e=>{B.current=e,O.current!==e&&(O.current=e)},[B]);return e.createElement(k,{ref:O,className:d("hierarchical-folder-list",I),style:w,tabIndex:0},e.createElement(C,{ref:P,style:T},e.createElement("div",{style:{height:z.length*x+"px",position:"relative"}},A.map(t=>{const n=t,r=M.has(n.id),i=S===n.id,o=n.depth;return e.createElement("div",{key:n.id,style:t.style},e.createElement(y,{item:n.data,depth:o,isExpanded:r,isSelected:i,toggleExpand:K,onItemClick:R,onItemDoubleClick:u,onItemContextMenu:f,renderItemContent:m,renderItemIcon:g,iconConfig:v,itemHeight:x}))}))))};export{y as FolderItem,F as FolderList,m as createFileExtensionIconResolver,s as flattenTree,f as getFileExtension,a as getVisibleItems,u as resolveIcon,h as useKeyboardNavigation,p as useVirtualization};
//# sourceMappingURL=index.esm.js.map
