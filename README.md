

# little-deer-ui

typescript+react

基于[docz](https://www.docz.site/)编写的组件介绍文，组件打包使用[gulp](https://gulpjs.com/)

## 使用

```sh
npm install little-deer-ui
```

## 按需加载组件配置

### 在 create-react-app 中使用

```sh
yarn add react-app-rewired customize-cra
```

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置

```javascript
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

#### 使用 babel-plugin-import

```shell
 yarn add babel-plugin-import
```

```javascript
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'little-deer-ui',
+     libraryDirectory: 'dist/lib',
+     camel2DashComponentName: false
+   },'little-deer-ui'),
+ );
```

[线上地址](https://g_guojq.gitee.io/little-deer-ui)

