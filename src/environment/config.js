const environment = process.env.NODE_ENV;

export default (function() {
  return require(`./${environment}.json`);
})();
