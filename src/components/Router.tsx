import * as KoaRouter from '@koa/router'
import * as Koa from 'koa'
import { produce } from 'immer'
import h from '../h'

interface RouterProps {
  router: KoaRouter
  getMiddleware: (arg0: KoaRouter) => KoaRouter.Middleware
  children: Array<(arg0: KoaRouter) => void>
}

export const Router = function({
  router,
  getMiddleware = koaRouter => koaRouter.routes(),
  children
}: RouterProps) {
  return function(app: Koa) {
    const processedRouter = produce(router, (imutRouter: KoaRouter) => {
      children.forEach((action: (arg0: KoaRouter) => void) => {
        action(imutRouter)
      })
    })
    app.use(getMiddleware(processedRouter))
  }
}

interface RouteProps {
  getMethod: (
    arg0: KoaRouter
  ) => (path: string, ...restArg: KoaRouter.Middleware[]) => void
  path: string
  children: KoaRouter.Middleware[]
}

Router.Route = function({
  getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) => router.all,
  path,
  children
}: RouteProps) {
  return function(router: KoaRouter) {
    getMethod(router)(path, ...children)
  }
}

Router.Get = function({ path, children }: RouteProps) {
  const getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) => router.get
  return <Router.Route getMethod={getMethod} path={path} children={children} />
}

Router.Post = function({ path, children }: RouteProps) {
  const getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) => router.post
  return <Router.Route getMethod={getMethod} path={path} children={children} />
}

Router.Put = function({ path, children }: RouteProps) {
  const getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) => router.put
  return <Router.Route getMethod={getMethod} path={path} children={children} />
}

Router.Patch = function({ path, children }: RouteProps) {
  const getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) =>
    router.patch
  return <Router.Route getMethod={getMethod} path={path} children={children} />
}

Router.Delete = function({ path, children }: RouteProps) {
  const getMethod = (
    router: KoaRouter
  ): ((path: string, ...restArg: KoaRouter.Middleware[]) => void) =>
    router.delete
  return <Router.Route getMethod={getMethod} path={path} children={children} />
}

export default Router
