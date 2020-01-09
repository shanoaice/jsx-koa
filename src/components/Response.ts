import * as KoaRouter from '@koa/router'

interface ResponseProps {
  children: Array<(ctx: KoaRouter.RouterContext) => void>
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
      action(ctx)
    })
    await next() // eslint-disable-line
  }
}

interface ResponseBodyProps {
  children: string | object | Buffer
  append: boolean
}

Response.Body = function({ children, append = false }: ResponseBodyProps) {
  return function(ctx: KoaRouter.RouterContext) {
    if (append) {
      ctx.body += children
      return
    }

    ctx.body = children
  }
}

interface ResponseStatusProps {
  children: number
}

Response.Status = function({ children }: ResponseStatusProps) {
  return function(ctx: KoaRouter.RouterContext) {
    ctx.status = children
  }
}

interface ResponseSetHeaderProps {
  field: string
  value: string | string[]
}

Response.SetHeader = function({ field, value }: ResponseSetHeaderProps) {
  return function(ctx: KoaRouter.RouterContext) {
    ctx.response.set(field, value)
  }
}

interface ResponseTypeProps {
  children: string
}

Response.Type = function({ children }: ResponseTypeProps) {
  return function(ctx: KoaRouter.RouterContext) {
    ctx.response.type = children
  }
}

export default Response
