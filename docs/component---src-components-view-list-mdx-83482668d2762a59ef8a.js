(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{i4AN:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return u})),n.d(t,"default",(function(){return f}));var i=n("Fcif"),o=n("+I+c"),a=n("mXGw"),s=n("/FXl"),r=n("TjRS"),c=n("ZFoC"),d=n("6wBQ"),u=(n("aD51"),{});void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/components/ViewList.mdx"}});var m={_frontmatter:u},b=r.a;function f(e){var t,n=e.components,f=Object(o.a)(e,["components"]);return Object(s.b)(b,Object(i.a)({},m,f,{components:n,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"listview"},"ListView"),Object(s.b)("h2",{id:"properties"},"Properties"),Object(s.b)(c.d,{of:d.a,mdxType:"Props"}),Object(s.b)("h2",{id:"basic-usage"},"Basic usage"),Object(s.b)(c.c,{__position:1,__code:"() => {\n  let initList = []\n  for (let i = 0; i < 30; i++) {\n    initList.push({\n      id: Math.random() * 100,\n      name: '测试' + Math.random() * 100,\n    })\n  }\n  const [list, setList] = React.useState(initList)\n  const [isLoaded, setIsLoaded] = React.useState(false)\n  const onLoad = currentPage => {\n    return new Promise((resolve, reject) => {\n      //           message.info('当前页：' + currentPage)\n      setTimeout(() => {\n        setList(list.concat(initList))\n        resolve(true)\n      }, 3000)\n    })\n  }\n  return (\n    <ListView onLoad={onLoad} isLoaded={isLoaded}>\n      <div>\n        {list.map((item, index) => (\n          <div key={index}>{item.name + ` ${index}`}</div>\n        ))}\n      </div>\n    </ListView>\n  )\n}",__scope:(t={props:f,DefaultLayout:r.a,Playground:c.c,Props:c.d,ListView:d.a},t.DefaultLayout=r.a,t._frontmatter=u,t),mdxType:"Playground"},(function(){for(var e=[],t=0;t<30;t++)e.push({id:100*Math.random(),name:"测试"+100*Math.random()});var n=a.useState(e),i=n[0],o=n[1],r=a.useState(!1),c=r[0];r[1];return Object(s.b)(d.a,{onLoad:function(t){return new Promise((function(t,n){setTimeout((function(){o(i.concat(e)),t(!0)}),3e3)}))},isLoaded:c,mdxType:"ListView"},Object(s.b)("div",null,i.map((function(e,t){return Object(s.b)("div",{key:t},e.name+" "+t)}))))})))}void 0!==f&&f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/components/ViewList.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-components-view-list-mdx-83482668d2762a59ef8a.js.map