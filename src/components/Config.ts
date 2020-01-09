import * as Koa from 'koa'
import { produce } from 'immer'

interface ConfigProps {
  app: Koa
  children: Array<(arg0: Koa) => void>
}

const Config = function({ app, children }: ConfigProps): Koa {
  return produce(app, (imutApp: Koa) => {
    children.forEach(comp => {
      comp(imutApp)
    })
  })
}

interface ConfigUseProps {
  children: Koa.Middleware
}

Config.Use = function({ children }: ConfigUseProps) {
  return function(app: Koa) {
    app.use(children)
  }
}

export default Config
