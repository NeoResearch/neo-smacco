module.exports = {
  mode : 'production',
  entry : './index.js',
  output: {
    library: 'smacco',
    libraryTarget: 'umd',
    filename: './bundle.js',
    auxiliaryComment: 'Test Comment'
  }
};
