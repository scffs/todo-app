import{r as s,f as e,j as a,L as o}from"./index-be5bb9e8.js";import{L as t}from"./index-c24f4d16.js";import"./App-61212801.js";const m="_taskList_zffge_1",i=s.lazy((()=>e((()=>import("./index-94df86f2.js")),["assets/index-94df86f2.js","assets/index-be5bb9e8.js","assets/index-c24f4d16.js","assets/App-61212801.js"]))),l=s.memo((({tasks:e,onToggle:l})=>a.jsx(t,{className:m,children:e.map((({id:e,completed:t,task:m})=>a.jsx(s.Suspense,{fallback:a.jsx(o,{}),children:a.jsx(i,{task:m,completed:t,onToggle:()=>l(e)})},e)))})));export{l as default};