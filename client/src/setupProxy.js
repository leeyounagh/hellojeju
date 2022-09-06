const { createProxyMiddleware } = require('http-proxy-middleware');
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const URL = `${PROXY}/v1/search/book.json`;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://hellojeju.herokuapp.com/',
      changeOrigin: true,
    })
  );
};