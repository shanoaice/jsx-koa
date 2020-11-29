# Setup demos in the `demo` folder

The demos in the `demo` folder requires some special setup before you run them. For convience of development, I didn't list the `jsx-koa` dependency directly in `package.json`. Instead, I links it to the demos. Follow the guide below to setup the demos.

## Compile `jsx-koa`

Follow the [Developer's Guide](developer_s-guide) to compile the source code of `jsx-koa`.

## Install demo dependency

Just run:

```bash
yarn
# or use npm
npm install
```

## Link the package

!> If you are using Windows, the following command may require administrative previliages

First, run:

```bash
yarn link
# or you can use npm
npm link
```
in the root directory of the source code.

Then, change into the directory of the demo you want to setup (such as `basic-with-error`) and run:

```bash
yarn link jsx-koa
# or npm
npm link jsx-koa
```

Now you are ready to run the demos by using `npm start` or `yarn start`.
