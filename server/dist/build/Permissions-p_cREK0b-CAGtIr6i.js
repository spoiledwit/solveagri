import{gd as De,gG as Fe,gH as He,gF as Ge,gB as Ve,gI as We,gJ as Ke,gK as Xe,gL as Ye,gM as qe,gD as ze,gN as Je,d as T,F as y,av as Qe,B as O,T as E,gO as Ze,r as S,aL as P,j as t,U as ie,d6 as Ue,eQ as J,gf as U,eD as H,aa as Oe,gP as oe,ge as k,g0 as R,gQ as B,gR as es,gS as $e,gs as q,gT as ce,ab as L,S as he,M as N,a7 as ss,gU as ge,K as ts,N as ns,J as os,gV as is,gW as rs,gX as as}from"./strapi-C1jW2Hnv.js";import{g as re}from"./groupBy-A2kDD48o.js";var ls=Fe,cs=He,ds=Ge,ps=Ve,us=We,hs=ze,gs=Ke,fs=Xe,ms=Ye,xs=qe;function Cs(e,s,o){var n=hs(e),r=n||gs(e)||xs(e);if(s=ps(s),o==null){var a=e&&e.constructor;r?o=n?new a:[]:ms(e)?o=fs(a)?cs(us(e)):{}:o={}}return(r?ls:ds)(e,function(c,i,l){return s(o,c,i,l)}),o}var js=Cs;const bs=De(js),[ys,Ss]=Je("PermissionsDataManager"),Y=()=>Ss("usePermissionsDataManager");function fe(e,s){function o(n,r){return bs(n,(a,c,i)=>(ss(c,r[i])||(a[i]=ge(c)&&ge(r[i])?o(c,r[i]):c),a))}return o(e,s)}const Te=e=>Array.isArray(e)?e.reduce((s,o)=>(Array.isArray(o)?s.push(...Te(o)):s.push(o),s),[]):[],G=e=>B(e)?Te(Object.values(e).map(s=>B(s)?G(s):s)):[],ve=(e,s,o)=>e.find(n=>n.action===s&&n.subject===o),ks=e=>{const s=me(e.plugins),o=me(e.settings),n=xe(e.collectionTypes),r=xe(e.singleTypes);return[...s,...o,...n,...r]},me=e=>Object.values(e).reduce((s,o)=>{const n=Object.values(o).reduce((r,a)=>{const c=Object.entries(a).reduce((i,[l,{conditions:d,properties:{enabled:p}}])=>(p&&i.push({action:l,subject:null,conditions:ae(d),properties:{}}),i),[]);return[...r,...c]},[]);return[...s,...n]},[]),xe=e=>Object.entries(e).reduce((o,n)=>{const[r,a]=n,c=Object.entries(a).reduce((i,l)=>{const[d,p]=l;if(!G(p).some(h=>h))return i;if(!p?.properties?.enabled){const h=Object.entries(p.properties).reduce((C,m)=>{const[u,f]=m;return C.properties[u]=Me(f),C},{action:d,subject:r,conditions:ae(p.conditions),properties:{}});return[...i,h]}return p.properties.enabled&&i.push({action:d,subject:r,properties:{},conditions:ae(p.conditions)}),i},[]);return[...o,...c]},[]),Me=(e,s="")=>Object.entries(e).reduce((o,n)=>{const[r,a]=n;return B(a)?[...o,...Me(a,`${s}${r}.`)]:(a&&!B(a)&&o.push(`${s}${r}`),o)},[]),ae=e=>Object.entries(e).filter(([,s])=>s).map(([s])=>s),we=(e,s=[])=>e.reduce((o,n)=>(o[n.id]=s.indexOf(n.id)!==-1,o),{}),Ce=(e,s,o=[])=>e.reduce((n,{categoryId:r,childrenForm:a})=>{const c=a.reduce((i,l)=>(i[l.subCategoryId]=l.actions.reduce((d,p)=>{const g=ve(o,p.action,null);return d[p.action]={properties:{enabled:g!==void 0},conditions:we(s,g?.conditions??[])},d},{}),i),{});return n[r]=c,n},{}),As=(e,s,o)=>{const n=({children:r=[]},a,c="")=>r.reduce((i,l)=>{if(l.children)return{...i,[l.value]:n(l,a,`${c}${l.value}.`)};const d=a.indexOf(`${c}${l.value}`)!==-1;return i[l.value]=d,i},{});return e.reduce((r,a)=>{const c=s.properties.find(({value:i})=>i===a);if(c){const i=o?.properties[c.value]??[],l=n(c,i);r.properties[a]=l}return r},{properties:{}})},je=({subjects:e,actions:s=[]},o,n=[])=>s.reduce((r,a)=>{const c=a.subjects.reduce((l,d)=>{const p=e.find(({uid:g})=>g===d)||null;return p&&(l[d]=p),l},{});if(J(c))return r;const i=Object.keys(c).reduce((l,d)=>{const{actionId:p,applyToProperties:g}=a,m=c[d].properties.map(({value:x})=>x).every(x=>(g||[]).indexOf(x)===-1),u=ve(n,p,d),f=we(o,u?.conditions??[]);if(l[d]||(l[d]={}),J(g)||m)return l[d][p]={properties:{enabled:u!==void 0},conditions:f},l;const j=As(g,c[d],u);return l[d][p]={...j,conditions:f},l},{});return es(r,i)},{}),be=(e,s)=>Object.entries(re(e,s)).map(([o,n])=>({category:o,categoryId:o.split(" ").join("-"),childrenForm:Object.entries(re(n,"subCategory")).map(([r,a])=>({subCategoryName:r,subCategoryId:r.split(" ").join("-"),actions:a}))})),Z=e=>Object.keys(e).reduce((s,o)=>{const n=e[o];if(B(n)&&!U(n,"conditions"))return{...s,[o]:Z(n)};if(B(n)&&U(n,"conditions")&&!G($e(n,"conditions")).some(a=>a)){const a=Object.keys(n.conditions).reduce((c,i)=>(c[i]=!1,c),{});return{...s,[o]:{...n,conditions:a}}}return s[o]=n,s},{}),z=(e,s,o=!1)=>Object.keys(e).reduce((n,r)=>{const a=e[r];return r==="conditions"&&!o?(n[r]=a,n):B(a)?{...n,[r]:z(a,s,r==="fields")}:(n[r]=s,n)},{}),I="12rem",de="20rem",se="5.3rem",pe=e=>e?Object.entries(e).reduce((s,[o,n])=>(o!=="conditions"&&(s[o]=n),s),{}):null,V=e=>{const s=pe(e),o=G(s);if(!o.length)return{hasAllActionsSelected:!1,hasSomeActionsSelected:!1};const n=o.every(a=>a),r=o.some(a=>a)&&!n;return{hasAllActionsSelected:n,hasSomeActionsSelected:r}},Pe=T(y)`
  padding-right: ${({theme:e})=>e.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({$isCollapsable:e})=>e&&"cursor: pointer;"}
`,ue=T.div`
  width: ${I};
`,_e=()=>t.jsx(O,{color:"danger700",paddingLeft:1,children:"*"}),Ee=({checkboxName:e="",children:s,isActive:o=!1,isCollapsable:n=!1,isFormDisabled:r=!1,label:a,onChange:c,onClick:i,someChecked:l=!1,value:d})=>{const{formatMessage:p}=P(),g={title:a,alignItems:"center",$isCollapsable:n};return n&&Object.assign(g,{onClick:i,"aria-expanded":o,onKeyDown({key:h}){(h==="Enter"||h===" ")&&i()},tabIndex:0,role:"button"}),t.jsxs(y,{alignItems:"center",paddingLeft:6,width:de,shrink:0,children:[t.jsx(O,{paddingRight:2,children:t.jsx(L,{name:e,"aria-label":p({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:a}),disabled:r,onCheckedChange:h=>c({target:{name:e,value:!!h}}),checked:l?"indeterminate":d})}),t.jsxs(Pe,{...g,children:[t.jsx(E,{ellipsis:!0,children:a}),s]})]})},Os=({availableActions:e=[],childrenForm:s=[],isFormDisabled:o,label:n,pathToData:r,propertyName:a})=>{const c=S.useMemo(()=>e.map(i=>{const l=Array.isArray(i.applyToProperties)&&i.applyToProperties.indexOf(a)!==-1&&i.isDisplayed;return{label:i.label,actionId:i.actionId,isActionRelatedToCurrentProperty:l}}),[e,a]);return t.jsxs(y,{display:"inline-flex",direction:"column",alignItems:"stretch",minWidth:0,children:[t.jsx(Rs,{label:n,headers:c}),t.jsx(O,{children:s.map(({children:i,label:l,value:d,required:p},g)=>t.jsx($s,{childrenForm:i,label:l,isFormDisabled:o,name:d,required:p,propertyActions:c,pathToData:r,propertyName:a,isOdd:g%2===0},d))})]})},$s=({childrenForm:e=[],label:s,isFormDisabled:o=!1,name:n,required:r=!1,pathToData:a,propertyActions:c,propertyName:i,isOdd:l=!1})=>{const{formatMessage:d}=P(),[p,g]=S.useState(null),{modifiedData:h,onChangeCollectionTypeLeftActionRowCheckbox:C,onChangeParentCheckbox:m,onChangeSimpleCheckbox:u}=Y(),f=p===n,j=S.useMemo(()=>Array.isArray(e)?e:[],[e]),x=j.length>0,b=S.useCallback(()=>{x&&g(A=>A===n?null:n)},[x,n]),$=({target:{value:A}})=>{C(a,i,n,A)},{hasAllActionsSelected:M,hasSomeActionsSelected:w}=S.useMemo(()=>Ts(c,h,a,i,n),[c,h,a,i,n]);return t.jsxs(t.Fragment,{children:[t.jsx(vs,{alignItems:"center",$isCollapsable:x,$isActive:f,background:l?"neutral100":"neutral0",children:t.jsxs(y,{children:[t.jsxs(Ee,{onChange:$,onClick:b,isCollapsable:x,isFormDisabled:o,label:s,someChecked:w,value:M,isActive:f,children:[r&&t.jsx(_e,{}),t.jsx(Q,{$isActive:f})]}),t.jsx(y,{children:c.map(({label:A,isActionRelatedToCurrentProperty:_,actionId:W})=>{if(!_)return t.jsx(ue,{},A);const v=[...a.split(".."),W,"properties",i,n];if(!x){const F=k(h,v,!1);return t.jsx(y,{width:I,position:"relative",justifyContent:"center",alignItems:"center",children:t.jsx(L,{disabled:o,name:v.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${n} ${A}`}),onCheckedChange:Be=>{u({target:{name:v.join(".."),value:!!Be}})},checked:F})},W)}const K=k(h,v,{}),{hasAllActionsSelected:D,hasSomeActionsSelected:ne}=V(K);return t.jsx(y,{width:I,position:"relative",justifyContent:"center",alignItems:"center",children:t.jsx(L,{disabled:o,name:v.join(".."),onCheckedChange:F=>{m({target:{name:v.join(".."),value:!!F}})},"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${n} ${A}`}),checked:ne?"indeterminate":D})},A)})})]})}),f&&t.jsx(Le,{childrenForm:j,isFormDisabled:o,parentName:n,pathToDataFromActionRow:a,propertyName:i,propertyActions:c,recursiveLevel:0})]})},Ts=(e,s,o,n,r)=>{const c=e.reduce((i,l)=>(l.isActionRelatedToCurrentProperty&&i.push(l.actionId),i),[]).reduce((i,l)=>{const d=k(s,[...o.split(".."),l,"properties",n,r],!1);return i[l]=d,i},{});return V(c)},vs=T(y)`
  height: ${se};
  flex: 1;

  &:hover {
    ${({$isCollapsable:e,theme:s})=>e&&ee(s)}
  }

  ${({$isCollapsable:e})=>e&&`
      ${Q} {
        display: flex;
      }
  `}
  ${({$isActive:e,theme:s})=>e&&ee(s)};
`,Q=T(Qe)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({theme:e})=>e.colors.neutral200};
  }

  transform: rotate(${({$isActive:e})=>e?"180":"0"}deg);
  margin-left: ${({theme:e})=>e.spaces[2]};
`,Le=({childrenForm:e=[],isFormDisabled:s,recursiveLevel:o,pathToDataFromActionRow:n,propertyActions:r,parentName:a,propertyName:c})=>{const{formatMessage:i}=P(),{modifiedData:l,onChangeParentCheckbox:d,onChangeSimpleCheckbox:p}=Y(),[g,h]=S.useState(null),C=u=>{h(f=>f===u?null:u)},m=S.useMemo(()=>g?e.find(({value:u})=>u===g):null,[g,e]);return t.jsxs(O,{paddingLeft:"3.2rem",children:[t.jsx(_s,{}),e.map(({label:u,value:f,required:j,children:x},b)=>{const $=b+1<e.length,M=Array.isArray(x),w=g===f;return t.jsxs(Ms,{$isVisible:$,children:[t.jsxs(y,{height:se,children:[t.jsx(Es,{children:t.jsx(Ls,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",$color:"primary200",children:t.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",fill:"#D9D8FF"})})}),t.jsxs(y,{style:{flex:1},children:[t.jsx(ws,{$level:o,$isActive:w,$isCollapsable:M,children:t.jsxs(Pe,{alignItems:"center",$isCollapsable:M,...M&&{onClick:()=>C(f),"aria-expanded":w,onKeyDown:({key:A})=>(A==="Enter"||A===" ")&&C(f),tabIndex:0,role:"button"},title:u,children:[t.jsx(Ps,{ellipsis:!0,children:u}),j&&t.jsx(_e,{}),t.jsx(Q,{$isActive:w})]})}),t.jsx(y,{style:{flex:1},children:r.map(({actionId:A,label:_,isActionRelatedToCurrentProperty:W})=>{if(!W)return t.jsx(ue,{},A);const v=[...n.split(".."),A,"properties",c,...a.split(".."),f],K=k(l,v,!1);if(!x)return t.jsx(y,{position:"relative",width:I,justifyContent:"center",alignItems:"center",children:t.jsx(L,{disabled:s,name:v.join(".."),"aria-label":i({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${u} ${_}`}),onCheckedChange:F=>{p({target:{name:v.join(".."),value:!!F}})},checked:K})},_);const{hasAllActionsSelected:D,hasSomeActionsSelected:ne}=V(K);return t.jsx(y,{position:"relative",width:I,justifyContent:"center",alignItems:"center",children:t.jsx(L,{disabled:s,name:v.join(".."),"aria-label":i({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${u} ${_}`}),onCheckedChange:F=>{d({target:{name:v.join(".."),value:!!F}})},checked:ne?"indeterminate":D},_)},_)})})]})]}),m&&w&&t.jsx(O,{paddingBottom:2,children:t.jsx(Le,{isFormDisabled:s,parentName:`${a}..${f}`,pathToDataFromActionRow:n,propertyActions:r,propertyName:c,recursiveLevel:o+1,childrenForm:m.children})})]},f)})]})},Ms=T(O)`
  border-left: ${({$isVisible:e,theme:s})=>e?`4px solid ${s.colors.primary200}`:"4px solid transparent"};
`,ws=T(y)`
  padding-left: ${({theme:e})=>e.spaces[4]};
  width: ${({$level:e})=>145-e*36}px;

  &:hover {
    ${({$isCollapsable:e,theme:s})=>e&&ee(s)}
  }

  ${({$isCollapsable:e})=>e&&`
      ${Q} {
        display: flex;
      }
  `}
  ${({$isActive:e,theme:s})=>e&&ee(s)};
`,Ps=T(E)``,_s=T.div`
  padding-top: ${({theme:e})=>e.spaces[2]};
  margin-top: ${({theme:e})=>e.spaces[2]};
  width: 0.4rem;
  background-color: ${({theme:e})=>e.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`,Es=T(O)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: 0.4rem;
    height: 1.2rem;
    background: ${({theme:e})=>e.colors.primary200};
    display: block;
  }
`,Ls=T.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,$color:s})=>e.colors[s]};
  }
`,Rs=({headers:e=[],label:s})=>{const{formatMessage:o}=P();return t.jsxs(y,{children:[t.jsx(y,{width:de,height:se,shrink:0,alignItems:"center",paddingLeft:6,children:t.jsx(E,{variant:"sigma",textColor:"neutral500",children:o({id:"Settings.roles.form.permission.property-label",defaultMessage:"{label} permissions"},{label:s})})}),e.map(n=>n.isActionRelatedToCurrentProperty?t.jsx(y,{width:I,shrink:0,justifyContent:"center",children:t.jsx(E,{variant:"sigma",textColor:"neutral500",children:o({id:`Settings.roles.form.permissions.${n.label.toLowerCase()}`,defaultMessage:n.label})})},n.label):t.jsx(y,{width:I,shrink:0},n.label))]})},ee=e=>Ze`
  color: ${e.colors.primary600};
  font-weight: ${e.fontWeights.bold};

  ${Q} {
    path {
      fill: ${e.colors.primary600};
    }
  }
`,Is=S.forwardRef(({onClick:e,className:s,hasConditions:o=!1,variant:n="tertiary"},r)=>{const{formatMessage:a}=P();return t.jsx(Ns,{$hasConditions:o,className:s,children:t.jsx(ie,{variant:n,startIcon:t.jsx(Ue,{}),onClick:e,ref:r,children:a({id:"global.settings",defaultMessage:"Settings"})})})}),Ns=T(O)`
  ${({$hasConditions:e,theme:s})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: 2rem;
      background: ${s.colors.primary600};
    }
  `}
`,te=T(Is)``,Re=({actions:e=[],headerBreadCrumbs:s=[],isFormDisabled:o,onClose:n})=>{const{formatMessage:r}=P(),{availableConditions:a,modifiedData:c,onChangeConditions:i}=Y(),l=S.useMemo(()=>Object.entries(re(a,"category")),[a]),d=e.filter(({isDisplayed:u,hasSomeActionsSelected:f,hasAllActionsSelected:j})=>u&&!!(f||j)),[p,g]=S.useState(ye(d,c,l)),h=(u,f)=>{g(Oe(j=>{j[u]||(j[u]={}),j[u].default||(j[u].default={}),j[u].default=f}))},C=()=>{const u=Object.entries(p).reduce((f,j)=>{const[x,b]=j,$=Object.values(b).reduce((M,w)=>({...M,...w}),{});return f[x]=$,f},{});i(u),n&&n()},m=()=>{g(ye(d,c,l)),n&&n()};return t.jsxs(N.Content,{children:[t.jsx(N.Header,{children:t.jsx(ts,{id:"condition-modal-breadcrumbs",label:s.join(", "),children:s.map((u,f,j)=>t.jsx(ns,{isCurrent:f===j.length-1,children:os(r({id:u,defaultMessage:u}))},u))})}),t.jsxs(N.Body,{children:[d.length===0&&t.jsx(E,{children:r({id:"Settings.permissions.conditions.no-actions",defaultMessage:"You first need to select actions (create, read, update, ...) before defining conditions on them."})}),t.jsx("ul",{children:d.map(({actionId:u,label:f,pathToConditionsObject:j},x)=>{const b=j.join("..");return t.jsx(Bs,{arrayOfOptionsGroupedByCategory:l,label:f,isFormDisabled:o,isGrey:x%2===0,name:b,onChange:h,value:k(p,b,{})},u)})})]}),t.jsxs(N.Footer,{children:[t.jsx(ie,{variant:"tertiary",onClick:()=>m(),children:r({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),t.jsx(ie,{onClick:C,children:r({id:"Settings.permissions.conditions.apply",defaultMessage:"Apply"})})]})]})},ye=(e,s,o)=>e.reduce((n,r)=>{const a=k(s,[...r.pathToConditionsObject,"conditions"],{}),c=o.reduce((i,l)=>{const[d,p]=l,g=p.reduce((h,C)=>(h[C.id]=k(a,C.id,!1),h),{});return i[d]=g,i},{});return n[r.pathToConditionsObject.join("..")]=c,n},{}),Bs=({arrayOfOptionsGroupedByCategory:e,isFormDisabled:s=!1,isGrey:o=!1,label:n,name:r,onChange:a,value:c})=>{const{formatMessage:i}=P(),l=d=>{a&&a(r,Hs(e,d))};return t.jsxs(y,{tag:"li",background:o?"neutral100":"neutral0",paddingBottom:3,paddingTop:3,children:[t.jsxs(y,{paddingLeft:6,style:{width:180},children:[t.jsxs(E,{variant:"sigma",textColor:"neutral600",children:[i({id:"Settings.permissions.conditions.can",defaultMessage:"Can"})," "]}),t.jsx(E,{variant:"sigma",title:n,textColor:"primary600",ellipsis:!0,children:i({id:`Settings.roles.form.permissions.${n.toLowerCase()}`,defaultMessage:n})}),t.jsxs(E,{variant:"sigma",textColor:"neutral600",children:[" ",i({id:"Settings.permissions.conditions.when",defaultMessage:"When"})]})]}),t.jsx(O,{style:{maxWidth:430,width:"100%"},children:t.jsx(is,{id:r,customizeContent:(d=[])=>`${d.length} currently selected`,onChange:l,value:Ds(c),options:Fs(e),disabled:s})})]})},Ds=e=>Object.values(e).map(s=>Object.entries(s).filter(([,o])=>o).map(([o])=>o)).flat(),Fs=e=>e.reduce((s,[o,n])=>(s.push({label:ce(o),children:n.map(r=>({label:r.displayName,value:r.id}))}),s),[]),Hs=(e,s)=>e.map(([,o])=>o).flat().reduce((o,n)=>({[n.id]:s.includes(n.id),...o}),{}),Gs=({actions:e=[],isFormDisabled:s,pathToData:o,subjects:n=[]})=>{const[r,a]=S.useState(null),c=i=>()=>{a(r===i?null:i)};return t.jsx(t.Fragment,{children:n.map(({uid:i,label:l,properties:d},p)=>{const g=r===i,h=e.map(C=>({...C,isDisplayed:Array.isArray(C.subjects)&&C.subjects.indexOf(i)!==-1}));return t.jsxs(y,{direction:"column",display:"inline-flex",alignItems:"stretch",minWidth:"100%",borderColor:g?"primary600":void 0,children:[t.jsx(Vs,{availableActions:h,isActive:g,isGrey:p%2===0,isFormDisabled:s,label:l,onClickToggle:c(i),pathToData:[o,i].join("..")}),g&&d.map(({label:C,value:m,children:u})=>t.jsx(Os,{availableActions:h,childrenForm:u,isFormDisabled:s,label:C,pathToData:[o,i].join(".."),propertyName:m},m))]},i)})})},Vs=({availableActions:e=[],isActive:s=!1,isGrey:o=!1,isFormDisabled:n=!1,label:r,onClickToggle:a,pathToData:c})=>{const{formatMessage:i}=P(),{modifiedData:l,onChangeParentCheckbox:d,onChangeSimpleCheckbox:p}=Y(),[g,h]=S.useState(!1),C=k(l,c.split(".."),{}),m=S.useMemo(()=>Object.keys(C).reduce((b,$)=>(b[$]=$e(C[$],"conditions"),b),{}),[C]),{hasAllActionsSelected:u,hasSomeActionsSelected:f}=V(m),j=S.useMemo(()=>Ws(e,l,c),[e,l,c]),x=j.some(b=>b.hasConditions);return t.jsxs(Ks,{$isActive:s,children:[t.jsxs(Ie,{height:se,flex:1,alignItems:"center",background:o?"neutral100":"neutral0",children:[t.jsx(Ee,{isCollapsable:!0,isFormDisabled:n,label:ce(r),checkboxName:c,onChange:d,onClick:a,someChecked:f,value:u,isActive:s,children:t.jsx(Ne,{paddingLeft:2,children:s?t.jsx(rs,{}):t.jsx(as,{})})}),t.jsx(y,{style:{flex:1},children:j.map(({actionId:b,hasSomeActionsSelected:$,isDisplayed:M,...w})=>{if(!M)return t.jsx(ue,{},b);const{hasConditions:A,hasAllActionsSelected:_,isParentCheckbox:W,checkboxName:v,label:K}=w;return W?t.jsxs(Se,{justifyContent:"center",alignItems:"center",children:[A&&t.jsx(O,{tag:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),t.jsx(L,{disabled:n,name:v,"aria-label":i({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${K} ${r}`}),onCheckedChange:D=>{d({target:{name:v,value:!!D}})},checked:$?"indeterminate":_})]},b):t.jsxs(Se,{justifyContent:"center",alignItems:"center",children:[A&&t.jsx(O,{tag:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),t.jsx(L,{disabled:n,name:v,onCheckedChange:D=>{p({target:{name:v,value:!!D}})},checked:A?"indeterminate":_})]},b)})})]}),t.jsx(O,{bottom:"10px",right:"9px",position:"absolute",children:t.jsxs(N.Root,{open:g,onOpenChange:()=>{h(b=>!b)},children:[t.jsx(N.Trigger,{children:t.jsx(te,{hasConditions:x})}),t.jsx(Re,{headerBreadCrumbs:[r,"Settings.permissions.conditions.conditions"],actions:j,isFormDisabled:n,onClose:()=>{h(!1)}})]})})]})},Ws=(e,s,o)=>e.map(({actionId:n,isDisplayed:r,applyToProperties:a,label:c})=>{if(!r)return{actionId:n,hasSomeActionsSelected:!1,isDisplayed:r};const i=[...o.split(".."),n],l=J(a)?[...i,"properties","enabled"]:i,d=k(s,[...i,"conditions"],null),p={actionId:n,checkboxName:l.join(".."),hasConditions:G(d).some(m=>m),isDisplayed:r,label:c,pathToConditionsObject:i};if(J(a)){const m=k(s,l,!1);return{...p,hasAllActionsSelected:m,hasSomeActionsSelected:m,isParentCheckbox:!1}}const g=k(s,l,null),{hasAllActionsSelected:h,hasSomeActionsSelected:C}=V(g);return{...p,hasAllActionsSelected:h,hasSomeActionsSelected:C,isParentCheckbox:!0}}),le=(e,s)=>`
  ${Ie} {
    background-color: ${e.colors.primary100};
    color: ${e.colors.primary600};
    border-radius: ${s?"2px 2px 0 0":"2px"};
    font-weight: ${e.fontWeights.bold};
  }

  ${Ne} {
    display: flex;
  }
  ${te} {
    display: block;
  }

  &:focus-within {
    ${()=>le(e,s)}
  }
`,Ie=T(y)`
  border: 1px solid transparent;
`,Ks=T.div`
  display: inline-flex;
  min-width: 100%;
  position: relative;

  ${te} {
    display: none;
  }

  ${({$isActive:e,theme:s})=>e&&le(s,e)}

  &:hover {
    ${({theme:e,$isActive:s})=>le(e,s)}
  }
`,Se=T(y)`
  width: ${I};
  position: relative;
`,Ne=T(O)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,Xs=({actions:e=[],isFormDisabled:s,kind:o})=>{const{formatMessage:n}=P(),{modifiedData:r,onChangeCollectionTypeGlobalActionCheckbox:a}=Y(),c=e.filter(({subjects:l})=>l&&l.length),i=S.useMemo(()=>{const l=c.map(({actionId:h})=>h),d=r[o],p=l.reduce((h,C)=>(Object.keys(d).forEach(m=>{const u=k(d,[m,C]),f={[m]:pe(u)};h[C]?h[C]={...h[C],...f}:h[C]=f}),h),{});return Object.keys(p).reduce((h,C)=>(h[C]=V(p[C]),h),{})},[r,c,o]);return t.jsx(O,{paddingBottom:4,paddingTop:6,style:{paddingLeft:de},children:t.jsx(y,{gap:0,children:c.map(({label:l,actionId:d})=>t.jsxs(y,{shrink:0,width:I,direction:"column",alignItems:"center",justifyContent:"center",gap:3,children:[t.jsx(E,{variant:"sigma",textColor:"neutral500",children:n({id:`Settings.roles.form.permissions.${l.toLowerCase()}`,defaultMessage:l})}),t.jsx(L,{disabled:s,onCheckedChange:p=>{a(o,d,!!p)},name:d,"aria-label":n({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:n({id:`Settings.roles.form.permissions.${l.toLowerCase()}`,defaultMessage:l})}),checked:k(i,[d,"hasSomeActionsSelected"],!1)?"indeterminate":k(i,[d,"hasAllActionsSelected"],!1)})]},d))})})},ke=({isFormDisabled:e,kind:s,layout:{actions:o,subjects:n}})=>{const r=[...n].sort((a,c)=>a.label.localeCompare(c.label));return t.jsxs(O,{background:"neutral0",children:[t.jsx(Xs,{actions:o,kind:s,isFormDisabled:e}),t.jsx(Gs,{actions:o,isFormDisabled:e,pathToData:s,subjects:r})]})},Ae=({layout:e,...s})=>t.jsx(O,{padding:6,background:"neutral0",children:t.jsx(q.Root,{size:"M",children:e.map(({category:o,categoryId:n,childrenForm:r},a)=>t.jsx(Ys,{childrenForm:r,variant:a%2===1?"primary":"secondary",name:o,pathToData:[s.kind,n],...s},o))})}),Ys=({childrenForm:e,kind:s,name:o,isFormDisabled:n=!1,variant:r,pathToData:a})=>{const{formatMessage:c}=P(),i=o.split("::").pop()??"";return t.jsxs(q.Item,{value:o,children:[t.jsx(q.Header,{variant:r,children:t.jsx(q.Trigger,{caretPosition:"right",description:`${c({id:"Settings.permissions.category",defaultMessage:i},{category:i})} ${s==="plugins"?"plugin":s}`,children:ce(i)})}),t.jsx(q.Content,{children:t.jsx(O,{padding:6,children:e.map(({actions:l,subCategoryName:d,subCategoryId:p})=>t.jsx(qs,{actions:l,categoryName:i,isFormDisabled:n,subCategoryName:d,pathToData:[...a,p]},d))})})]})},qs=({actions:e=[],categoryName:s,isFormDisabled:o,subCategoryName:n,pathToData:r})=>{const{modifiedData:a,onChangeParentCheckbox:c,onChangeSimpleCheckbox:i}=Y(),[l,d]=S.useState(!1),{formatMessage:p}=P(),g=k(a,r,{}),h=S.useMemo(()=>Object.keys(g).reduce((x,b)=>(x[b]=pe(g[b]),x),{}),[g]),{hasAllActionsSelected:C,hasSomeActionsSelected:m}=V(h),u=S.useMemo(()=>e.map(x=>{const b=[...r,x.action,"properties","enabled"],$=k(a,b,!1),M=k(a,[...r,x.action,"conditions"],{}),w=G(M).some(A=>A);return{...x,isDisplayed:$,checkboxName:b.join(".."),hasSomeActionsSelected:$,value:$,hasConditions:w,label:x.displayName,actionId:x.action,pathToConditionsObject:[...r,x.action]}}),[e,a,r]),f=k(a,[...r],{}),j=G(Object.entries(f).reduce((x,b)=>{const[$,{conditions:M}]=b;return x[$]=M,x},{})).some(x=>x);return t.jsx(t.Fragment,{children:t.jsxs(O,{children:[t.jsxs(y,{justifyContent:"space-between",alignItems:"center",children:[t.jsx(O,{paddingRight:4,children:t.jsx(E,{variant:"sigma",textColor:"neutral600",children:n})}),t.jsx(zs,{flex:1}),t.jsx(O,{paddingLeft:4,children:t.jsx(L,{name:r.join(".."),disabled:o,onCheckedChange:x=>{c({target:{name:r.join(".."),value:!!x}})},checked:m?"indeterminate":C,children:p({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),t.jsxs(y,{paddingTop:6,paddingBottom:6,children:[t.jsx(he.Root,{gap:2,style:{flex:1},children:u.map(({checkboxName:x,value:b,action:$,displayName:M,hasConditions:w})=>t.jsx(he.Item,{col:3,direction:"column",alignItems:"start",children:t.jsx(Js,{$disabled:o,$hasConditions:w,children:t.jsx(L,{name:x,disabled:o,onCheckedChange:A=>{i({target:{name:x,value:!!A}})},checked:b,children:M})})},$))}),t.jsxs(N.Root,{open:l,onOpenChange:()=>{d(x=>!x)},children:[t.jsx(N.Trigger,{children:t.jsx(te,{hasConditions:j})}),t.jsx(Re,{headerBreadCrumbs:[s,n],actions:u,isFormDisabled:o,onClose:()=>{d(!1)}})]})]})]})})},zs=T(O)`
  align-self: center;
  border-top: 1px solid ${({theme:e})=>e.colors.neutral150};
`,Js=T.div`
  position: relative;
  word-break: keep-all;
  ${({$hasConditions:e,$disabled:s,theme:o})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -0.4rem;
      left: -0.8rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 2rem;
      background: ${s?o.colors.neutral100:o.colors.primary600};
    }
  `}
`,X=[{labelId:"app.components.LeftMenuLinkContainer.collectionTypes",defaultMessage:"Collection Types",id:"collectionTypes"},{labelId:"app.components.LeftMenuLinkContainer.singleTypes",id:"singleTypes",defaultMessage:"Single Types"},{labelId:"app.components.LeftMenuLinkContainer.plugins",defaultMessage:"Plugins",id:"plugins"},{labelId:"app.components.LeftMenuLinkContainer.settings",defaultMessage:"Settings",id:"settings"}],tt=S.forwardRef(({layout:e,isFormDisabled:s,permissions:o=[]},n)=>{const[{initialData:r,layouts:a,modifiedData:c},i]=S.useReducer(Zs,Qs,()=>Us(e,o)),{formatMessage:l}=P();S.useImperativeHandle(n,()=>({getPermissions(){const m=fe(r.collectionTypes,c.collectionTypes),u=fe(r.singleTypes,c.singleTypes),f={...m,...u};let j;return J(f)?j=!1:j=Object.values(f).some((x={})=>Object.values(x).some(b=>U(b,"conditions"))),{permissionsToSend:ks(c),didUpdateConditions:j}},resetForm(){i({type:"RESET_FORM"})},setFormAfterSubmit(){i({type:"SET_FORM_AFTER_SUBMIT"})}}));const d=(m,u,f,j)=>{i({type:"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",pathToCollectionType:m,propertyName:u,rowName:f,value:j})},p=(m,u,f)=>{i({type:"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",collectionTypeKind:m,actionId:u,value:f})},g=m=>{i({type:"ON_CHANGE_CONDITIONS",conditions:m})},h=S.useCallback(({target:{name:m,value:u}})=>{i({type:"ON_CHANGE_SIMPLE_CHECKBOX",keys:m,value:u})},[]),C=S.useCallback(({target:{name:m,value:u}})=>{i({type:"ON_CHANGE_TOGGLE_PARENT_CHECKBOX",keys:m,value:u})},[]);return t.jsx(ys,{availableConditions:e.conditions,modifiedData:c,onChangeConditions:g,onChangeSimpleCheckbox:h,onChangeParentCheckbox:C,onChangeCollectionTypeLeftActionRowCheckbox:d,onChangeCollectionTypeGlobalActionCheckbox:p,children:t.jsxs(H.Root,{defaultValue:X[0].id,children:[t.jsx(H.List,{"aria-label":l({id:"Settings.permissions.users.tabs.label",defaultMessage:"Tabs Permissions"}),children:X.map(m=>t.jsx(H.Trigger,{value:m.id,children:l({id:m.labelId,defaultMessage:m.defaultMessage})},m.id))}),t.jsx(H.Content,{value:X[0].id,children:t.jsx(ke,{layout:a.collectionTypes,kind:"collectionTypes",isFormDisabled:s})}),t.jsx(H.Content,{value:X[1].id,children:t.jsx(ke,{layout:a.singleTypes,kind:"singleTypes",isFormDisabled:s})}),t.jsx(H.Content,{value:X[2].id,children:t.jsx(Ae,{layout:a.plugins,kind:"plugins",isFormDisabled:s})}),t.jsx(H.Content,{value:X[3].id,children:t.jsx(Ae,{layout:a.settings,kind:"settings",isFormDisabled:s})})]})})}),Qs={initialData:{},modifiedData:{},layouts:{}},Zs=(e,s)=>Oe(e,o=>{switch(s.type){case"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX":{const{collectionTypeKind:n,actionId:r,value:a}=s,c=["modifiedData",n];Object.keys(k(e,c)).forEach(i=>{const l=k(e,[...c,i,r],void 0);if(l){let d=z(l,a);if(!a&&d.conditions){const p=z(d.conditions,!1);d={...d,conditions:p}}R(o,[...c,i,r],d)}});break}case"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX":{const{pathToCollectionType:n,propertyName:r,rowName:a,value:c}=s;let i=oe(e.modifiedData);const l=n.split(".."),d=k(i,l,{});Object.keys(d).forEach(p=>{if(U(d[p],`properties.${r}`)){const g=k(d,[p,"properties",r,a]),h=[...l,p,"properties",r,a];if(!B(g))R(i,h,c);else{const C=z(g,c);R(i,h,C)}}}),c||(i=Z(i)),R(o,"modifiedData",i);break}case"ON_CHANGE_CONDITIONS":{Object.entries(s.conditions).forEach(n=>{const[r,a]=n;R(o,["modifiedData",...r.split(".."),"conditions"],a)});break}case"ON_CHANGE_SIMPLE_CHECKBOX":{let n=oe(e.modifiedData);R(n,[...s.keys.split("..")],s.value),s.value||(n=Z(n)),R(o,"modifiedData",n);break}case"ON_CHANGE_TOGGLE_PARENT_CHECKBOX":{const{keys:n,value:r}=s,a=[...n.split("..")];let c=oe(e.modifiedData);const i=k(c,a,{}),l=z(i,r);R(c,a,l),r||(c=Z(c)),R(o,["modifiedData"],c);break}case"RESET_FORM":{o.modifiedData=e.initialData;break}case"SET_FORM_AFTER_SUBMIT":{o.initialData=e.modifiedData;break}default:return o}}),Us=(e,s)=>{const{conditions:o,sections:{collectionTypes:n,singleTypes:r,plugins:a,settings:c}}=e,i={collectionTypes:n,singleTypes:r,plugins:be(a,"plugin"),settings:be(c,"category")},l={collectionTypes:je(n,o,s),singleTypes:je(r,o,s),plugins:Ce(i.plugins,o,s),settings:Ce(i.settings,o,s)};return{initialData:l,modifiedData:l,layouts:i}};export{tt as P};
