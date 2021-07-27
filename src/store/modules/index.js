const requireModule = require.context(".", true, /\.store\.js$/);
const modules = {};

requireModule.keys().forEach((filename) => {
  //remove directory name
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .split("/")
    .pop()
    .replace(/(\.\/|\.store\.js)/g, "")
    .replace(/^\w/, (c) => c.toUpperCase());

  modules[moduleName] =
    requireModule(filename).default || requireModule(filename);
});

export default modules;
