(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{eCil:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return f}));var i=t("Fcif"),o=t("+I+c"),c=t("mXGw"),r=t("/FXl"),a=t("TjRS"),b=t("ZFoC"),s=t("goKx"),l=(t("aD51"),{});void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/components/Picker.mdx"}});var u={_frontmatter:l},p=a.a;function f(e){var n,t=e.components,f=Object(o.a)(e,["components"]);return Object(r.b)(p,Object(i.a)({},u,f,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"picker"},"Picker"),Object(r.b)("h2",{id:"properties"},"Properties"),Object(r.b)(b.d,{of:s.a,mdxType:"Props"}),Object(r.b)("h2",{id:"basic-usage"},"Basic usage"),Object(r.b)(b.c,{__position:1,__code:'() => {\n  const [visible, setVisible] = React.useState(false)\n  return (\n    <div>\n      <button\n        onClick={() => {\n          setVisible(!visible)\n        }}\n      >\n        打开\n      </button>\n      <Picker\n        placement="top"\n        visible={visible}\n        onCancel={() => {\n          setVisible(false)\n        }}\n      >\n        {Array.from({ length: 100 }).map((i, v) => (\n          <div key={v}>{v}</div>\n        ))}\n      </Picker>\n    </div>\n  )\n}',__scope:(n={props:f,DefaultLayout:a.a,Playground:b.c,Props:b.d,Picker:s.a},n.DefaultLayout=a.a,n._frontmatter=l,n),mdxType:"Playground"},(function(){var e=c.useState(!1),n=e[0],t=e[1];return Object(r.b)("div",null,Object(r.b)("button",{onClick:function(){t(!n)}},"打开"),Object(r.b)(s.a,{placement:"top",visible:n,onCancel:function(){t(!1)},mdxType:"Picker"},Array.from({length:100}).map((function(e,n){return Object(r.b)("div",{key:n},n)}))))})))}void 0!==f&&f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/components/Picker.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-components-picker-mdx-32808ff64425f250f64c.js.map