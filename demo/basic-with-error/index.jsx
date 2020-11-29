/** @jsx h */
import Koa from 'koa'
import KoaRouter from '@koa/router'
import { run, h, Config, Router, Response } from 'jsx-koa'

const app = new Koa()
const router = new KoaRouter()

function App() {
  return (
    <Config app={app}>
      <Router router={router}>
        <Router.Get path="/">
          <Response>
            <Response.Body>Hello JSX-Koa!</Response.Body>
          </Response>
        </Router.Get>
        <Router.Get path="/error">
          <Response>
            <Response.Status>500</Response.Status>
            <Response.Body>Hello JSX-Koa!</Response.Body>
          </Response>
        </Router.Get>
      </Router>
    </Config>
  )
}

run(<App />, 8777)
