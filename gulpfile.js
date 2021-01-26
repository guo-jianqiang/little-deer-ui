const gulp = require('gulp');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const through2 = require('through2')
const autoprefixer = require('gulp-autoprefixer')
const less = require('gulp-less')

const babelOpts = {
  presets: ["@babel/preset-env", "@babel/preset-react", ["@babel/preset-typescript", { allowDeclareFields: true }]],
  plugins: [
    '@babel/plugin-transform-spread',
    ['@babel/plugin-transform-runtime'],
    '@babel/plugin-proposal-export-default-from',
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": true
      }
    ]]
}

const paths = {
  dest: {
    dist: 'dist/lib',
  },
  icon: 'src/components/Iconfont/font.js',
  styles: 'src/components/**/*.less', // 样式文件路径 - 暂时不关心
  typings: 'src/@types/**/*.d.ts',
  components: 'src/components/**/*.{ts,tsx}', // 组件
  helpers: 'src/lib/helpers.ts', // 辅助函数
  localStorage: 'src/lib/localStorage.ts' // 缓存操作
};

function copyIconfont () {
  const {dest, icon} = paths
  return gulp.src(icon)
    .pipe(gulp.dest(dest.dist + '/Iconfont'))
}

function typescript () {
  const {dest, typings,  components, helpers, localStorage} = paths
  return gulp.src([typings, components, helpers, localStorage])
    .pipe(sourcemaps.init())
    .pipe(ts.createProject("tsconfig.json")())
    // .js
    // .pipe(babel(babelOpts))
    .pipe(through2.obj(function z (file, encoding, next) {
      this.push(file.clone());
      file.contents = Buffer.from(file.contents.toString().replace(/\.less/g, '.css'));
      file.contents = Buffer.from(file.contents.toString().replace(/\.\/components/g, './lib'))
      this.push(file);
      next()
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest.dist));
}


function compileIndex () {
  const {typings} = paths
  return gulp.src([typings, 'src/index.ts'])
    // .pipe(babel(babelOpts))
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(through2.obj(function z (file, encoding, next) {
      this.push(file.clone())
      file.contents = Buffer.from(file.contents.toString().replace(/\.\/components/g, './lib'))
      this.push(file)
      next()
    }))
    .pipe(gulp.dest('dist'));
}

function less2css() {
  const { dest, styles } = paths;
  return gulp
    .src(styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(gulp.dest(dest.dist))
}

function cleanDist () {
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean())
}

const build = gulp.series(cleanDist, typescript, copyIconfont, compileIndex, less2css);

exports.build = build;

exports.default = build;
