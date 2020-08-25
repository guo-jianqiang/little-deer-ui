const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript')
const through2 = require('through2')
const autoprefixer = require('gulp-autoprefixer')
const less = require('gulp-less')
const cssnano = require('gulp-cssnano')

const babelOpts = {
  presets: ['@babel/env', '@babel/preset-typescript', '@babel/react'],
  plugins: ['@babel/plugin-transform-runtime','@babel/proposal-class-properties'],
  env: {
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    },
  },
}

const paths = {
  dest: {
    dist: 'dist/lib',
  },
  styles: 'src/components/**/*.less', // 样式文件路径 - 暂时不关心
  scripts: ['src/components/**/*.{ts,tsx}'], // 脚本文件路径
};

function typescript () {
  const {dest, scripts} = paths
  return gulp.src(scripts)
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(through2.obj(function z (file, encoding, next) {
      this.push(file.clone());
      file.contents = Buffer.from(file.contents.toString().replace(/\.less/g, '.css'));
      this.push(file);
      next()
    }))
    .pipe(gulp.dest(dest.dist));
}


function compileIndex () {
  return gulp.src('src/index.ts')
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

const build = gulp.series(cleanDist, typescript, compileIndex, less2css);

exports.build = build;

exports.default = build;
