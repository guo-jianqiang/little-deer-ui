(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{i4AN:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return m})),n.d(t,"default",(function(){return p}));var i=n("Fcif"),o=n("+I+c"),a=n("mXGw"),r=n("/FXl"),s=n("TjRS"),c=n("ZFoC"),u=n("6wBQ"),m=(n("aD51"),{});void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/components/ViewList.mdx"}});var d={_frontmatter:m},b=s.a;function p(e){var t,n=e.components,p=Object(o.a)(e,["components"]);return Object(r.b)(b,Object(i.a)({},d,p,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"listview"},"ListView"),Object(r.b)("h2",{id:"properties"},"Properties"),Object(r.b)(c.d,{of:u.a,mdxType:"Props"}),Object(r.b)("h2",{id:"basic-usage"},"Basic usage"),Object(r.b)(c.c,{__position:1,__code:"() => {\n  let initList = []\n  for (let i = 0; i < 30; i++) {\n    initList.push({\n      id: Math.random() * 100,\n      name: '测试' + Math.random() * 100,\n    })\n  }\n  const [list, setList] = React.useState(initList)\n  const onLoad = currentPage => {\n    return new Promise((resolve, reject) => {\n      //           message.info('当前页：' + currentPage)\n      setList(list.concat(initList))\n      setTimeout(() => {\n        return resolve(true)\n      }, 500)\n    })\n  }\n  return (\n    <ListView onLoad={onLoad}>\n      <div>\n        {list.map((item, index) => (\n          <div key={index}>{item.name}</div>\n        ))}\n      </div>\n    </ListView>\n  )\n}",__scope:(t={props:p,DefaultLayout:s.a,Playground:c.c,Props:c.d,ListView:u.a},t.DefaultLayout=s.a,t._frontmatter=m,t),mdxType:"Playground"},(function(){for(var e=[],t=0;t<30;t++)e.push({id:100*Math.random(),name:"测试"+100*Math.random()});var n=a.useState(e),i=n[0],o=n[1];return Object(r.b)(u.a,{onLoad:function(t){return new Promise((function(t,n){o(i.concat(e)),setTimeout((function(){return t(!0)}),500)}))},mdxType:"ListView"},Object(r.b)("div",null,i.map((function(e,t){return Object(r.b)("div",{key:t},e.name)}))))})))}void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/components/ViewList.mdx"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-components-view-list-mdx-581f7f4013f710ab709c.js.map