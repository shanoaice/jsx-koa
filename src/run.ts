import * as Koa from 'koa'

const run = function(app: Koa, port = 8080, host = 'localhost'): void {
  app.listen(port, host)
}

export default run
