# Getting Started

First, you should be familiar with Koa. If not, it is better for you to learn Koa first, or else some concepts in this guide could seem alien to you.

You should also be familiar with React, or at least, JSX. If not, study it first([tutorial](https://reactjs.org/docs/introducing-jsx.html)), or you could be completely confused.

## Install

```bash
npm i -S jsx-koa
# or you can use yarn
yarn add jsx-koa
```

You also need to manually install Koa:

```bash
npm i -S koa
# or yarn
yarn add koa
```

If you need to use routing in your application, install `@koa/router` (or you can use another Express-style router, but you need to customize the `Router` component. Head to [Custom Router](custom-router) for more details.):
``` bash
npm i -S @koa/router
# or yarn
yarn add @koa/router
```


## Setup compilation tool (Babel)

Although you can use jsx-koa without JSX syntax, it is more convenient to use it in you apps.

First, install babel:

```bash
npm i -D @babel/core @babel/plugin-transform-react-jsx @babel/cli
```

You may optionally install `@babel/register` for quick prototyping. For convience, all guides below rely on it, so you'd better install it:

```bash
npm i -S @babel/register
```

Create a file named `babel.config.js` in the root directory of your project. Add the following contnent to the file:

```javascript
module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        useSpread: true
      }
    ]
  ]
}
```

## Create your first app!

Let's get started. Create an `index.js` with the following contnent:

```jsx
import Koa from 'koa'
import Router from 'koa-better-router'
import { run, h, Config, Router, Response } form 'jsx-koa'

const app = new Koa()
const router = new Router().loadMethods()

function App() {
  return (
    <Config app={app}>
      <Router router={router}>
        <Router.Get path="/">
          <Response>
            <Response.Body>
              Hello JSX-Koa!
            </Response.Body>
          </Response>
        </Router.Get>
      </Router>
    </Config>
  )
}

run(<App />, 8777)
```

The example above may seem complicated. Don't be worried, we will explain these components later. Now, let's run the server:

```bash
# run the server with the @babel/register hook to compile JSX
node -r @babel/register index.js
```

Then, open `localhost:8777` in your browser. You should see `Hello JSX-Koa!` on the page.

## Introduction to components...

