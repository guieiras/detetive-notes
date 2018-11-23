const environment = process.env.NODE_ENV || 'development';

export default (function() {
  if (environment !== 'production') {
    return require(`./${environment}.json`);
  } else {
    return process.env;
  }
})();
