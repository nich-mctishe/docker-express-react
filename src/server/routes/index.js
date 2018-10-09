/**
 * actions
 */
const base = require('../actions/base')

module.exports = (app) => {
  /**
   * Put your API routes here.
   */
  app.get('/api/hello', base)
}
