# OpenShift Console WebGL Topology Plugin

A Proof-of-concept of a WebGL-based topology for the [OpenShift Console](https://github.com/openshift/console).

## Build

Note: Until the dynamic plugin SDK npm packages are updated, the repository needs to be cloned in the same directory as the console repository.
1. `yarn install` to install plugin dependencies
2. `yarn build` to build the plugin, generating output to `dist` directory
3. `yarn http-server` to start an HTTP server hosting the generated assets

```
Starting up http-server, serving ./dist
Available on:
  http://127.0.0.1:9001
  http://192.168.1.190:9001
  http://10.40.192.80:9001
Hit CTRL-C to stop the server
```

In another terminal window, run the openshift console bridge with the flag `-plugins console-demo-plugin=http://localhost:9001/`

For further steps like deploying to a cluster, see: https://github.com/openshift/console/tree/master/dynamic-demo-plugin
