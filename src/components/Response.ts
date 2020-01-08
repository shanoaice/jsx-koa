import * as KoaRouter from '@koa/router'

interface ResponseProps {
  children: Array<(ctx: KoaRouter.RouterContext, next: () => void) => void>
  defaultStatus: number
  defaultResponse: string
}

const Response = function({
  children,
  defaultResponse = 'ok',
  defaultStatus = 200
}: ResponseProps) {
  return async function(ctx: KoaRouter.RouterContext, next: () => void) {
    ctx.status = defaultStatus
    ctx.body = defaultResponse
    children.forEach(action => {
      action(ctx, next)
    })
  }
}

export default Response
