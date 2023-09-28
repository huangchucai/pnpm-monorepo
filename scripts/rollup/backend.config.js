import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils.js'

const { name, module, peerDependencies = {}, main } = getPackageJSON("backend"); // react
// react包的路径
const pkgPath = resolvePkgPath(name);
//react 产物路劲
const pkgDistPath = resolvePkgPath(name, true);

const jsName = module || main
export default [{
  input: `${pkgPath}/${jsName}`,
  output: [{
    file: `${pkgDistPath}/index.js`,
    format: "umd",
    sourcemap: true,
    name: 'backend'
  }, {
    file: `${pkgDistPath}/index.esm.js`,
    format: "esm",
    sourcemap: true,
  }],
  // 标记外部依赖代码，不进行打包
  external: [...Object.keys(peerDependencies)],
  plugins: [...getBaseRollupPlugins()]
}];
