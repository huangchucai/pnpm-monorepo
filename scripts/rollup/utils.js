import path from "path";
import fs from "fs";
import cjs from "@rollup/plugin-commonjs";
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
// import ts from "rollup-plugin-typescript2";

// 包路径
const pkgPath = path.resolve(__dirname, "../../packages");
// 打包产物路径
const distPath = path.resolve(__dirname, "../../dist/node_modules");

/**
 * 获取包路径或者是打包产物路径
 * @param pkgName
 * @param isDist 是否是打包
 */
export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    return `${distPath}/${pkgName}`;
  }
  return `${pkgPath}/${pkgName}`;
}

/**
 * 解析包对应的package.json 文件
 * @param pkgName
 */
export function getPackageJSON(pkgName) {
  //1. 包路径 + Package.json
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(str);
}

export function getBaseRollupPlugins() {
  return [
    cjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // only transpile our source code
    })];
}
