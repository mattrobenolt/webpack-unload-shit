console.log('print.js loaded');

export default () => {
  console.log('button clicked')
  console.log(require.cache)
  setTimeout(() => delete require.cache['./src/print'], 0);
};
