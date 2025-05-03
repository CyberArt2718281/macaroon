'use strict';

const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

function compileLess() {
    return src('./src/styles/*.less')
        .pipe(less()) // Компилируем LESS в CSS
        .pipe(concatCss('style.css')) // Объединяем все CSS файлы в один
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минифицируем CSS
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min к имени файла
        .pipe(dest('./dist')); // Сохраняем результат в папку dist
}

function watchFiles() {
    watch('./src/styles/*.less', series(compileLess)); // Следим за изменениями в LESS файлах
}

exports.less = compileLess;
exports.watch = watchFiles;

// Задача по умолчанию
exports.default = series(compileLess, watchFiles);