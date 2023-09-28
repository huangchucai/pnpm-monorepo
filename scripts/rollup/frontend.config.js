import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils'

const { name, module, peerDependencies = {}, main } = getPackageJSON("frontend");
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
    name: 'frontend',
    globals: {
      'is-url': 'isUrl'
    }
  }, {
    file: `${pkgDistPath}/index.esm.js`,
    format: "esm",
    sourcemap: true,
  }],
  external: [...Object.keys(peerDependencies)],
  plugins: [
    ...getBaseRollupPlugins(),
  ]
}];
