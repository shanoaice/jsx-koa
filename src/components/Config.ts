import * as Koa from 'koa'
import { produce } from 'immer'

interface ConfigProps {
  app: Koa
  children: Array<(arg0: Koa) => void>
}

function Config({ app, children }: ConfigProps): Koa {
  return produce(app, (imutApp: Koa) => {
    children.forEach(comp => {
      comp(imutApp)
    })
  })
}

export default Config
