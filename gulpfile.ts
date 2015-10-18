/// <reference path="./typings/bundle.d.ts" />

import { task, src, dest, watch } from 'gulp';
import * as ts from 'gulp-typescript';
import * as tslint from 'gulp-tslint';
import * as del from 'del';
const babel = require('gulp-babel');

const tsProject = ts.createProject('tsconfig.json', <any>{
	typescript: require('typescript')
});

task('build', ['build:ts']);

task('build:ts', () => {
	return tsProject.src()
		.pipe(ts(tsProject))
		.pipe(babel({
			modules: 'commonStrict'
		}))
		.pipe(dest('./built'));
});

task('watch', ['build', 'lint'], () => {
	watch('./src/**/*.ts', ['build:ts', 'lint']);
});

task('lint', () => {
	return src('./src/**/*.ts')
		.pipe(tslint(<any>{
			tslint: require('tslint')
		}))
		.pipe(tslint.report('verbose'));
});

task('test', ['build', 'lint']);

task('clean', ['clean-built', 'clean-dep']);

task('clean-built', cb => {
	del(['./built', './tmp'], cb);
});

task('clean-dep', cb => {
	del(['./node_modules', './typings'], cb);
});
