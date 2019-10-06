---
title: "Electron + React + Redux: sending events via ipc"
date: "2017-05-06T23:46:37.121Z"
description: "electron, menubar, react, redux"
---

While using electron and react for a [menubar](https://github.com/maxogden/menubar) side project, I found a slight discrepancy in the rendering of processes between the ipcMain process (electron) and the react component lifecycle methods.

When clicking the menubar icon, I expected the main `<App />`'s `componentDidMount` method to fire every time. However, its not like refreshing a browser window. After the first time open it, app has already been mounted. Thus the event that is actually occurring lies in the electron thread.

[menubar](https://github.com/maxogden/menubar) exposes a few helpful listeners that we can tap into:

```js
var menubar = require("menubar")

var mb = menubar()

mb.on("ready", function() {
  console.log("app is ready")
  // logs in the terminal
  // logs once, on app start
})
```

I wanted to fire an action every time the menubar was clicked and opened to refresh data in the view. Since `componentDidMount` doesn't fire, we need to facilitate communication between the electron **main process** and the **renderer process**. For this, we can use the menubar `show` event:

```js
mb.on("show", function() {
  console.log("show menubar")
  // logs every time the menubar is clicked/shown
})
```

Using the built in inter process communications (ipc) api proved to be unsuccessful after a few tries. After checking out a few projects I found the [electron-rpc](https://github.com/marcbachmann/electron-rpc) library which provides a thin wrapper over the api.

Setup is simple. In the `main.js` electron file you establish a "server" event emitter:

```js
import Server from "electron-rpc/server"

// Module to communicate to client window
const server = new Server()

// configure the emitter to communicate with the menubar client
mb.on("after-create-window", function() {
  server.configure(mb.window.webContents)
})

// broadcast the event when the menubar is shown
mb.on("show", function() {
  server.send("show", "some arguments")
})
```

Now set up a listener in the client. I chose the top level `index.js` file where my main component is rendered inside the redux `<Provider />`.

```js
import Client from "electron-rpc/client"

// Initialize rpc communication
const client = new Client()

// redux store configuration
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

client.on("show", (err, body) => {
  // global listener for ipc event sent from main process
  // when menu bar is opened, fire requestStories() action
  store.dispatch(requestStories())
})
```

Now every time the menubar is opened, the `requestStories()` action is fired and any connected component will update accordingly if there is new data.

Firing an action outside of a component/props might seem unconventional in react land but I think its perfectly acceptable, and a clever way to tap in to the flexibility of redux.

Its easy to get caught up thinking solely in terms of `bindActionCreators` and `mapDispatchToProps`, but its important to remember you can `import store from '../store` anywhere in your application and have access to its methods such as `store.dispatch()` and `store.getState()`.
