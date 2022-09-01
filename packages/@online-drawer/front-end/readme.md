# online-drawer/front-end

这是一个支持在线多人编辑的画板（前端部分）。

## dev

```shell
npm install
npm run dev
```

## build

### node

```shell
npm install
npm run build
```

静态文件生成在`./dist`中，可自行通过 http server 部署。

### docker

默认的 websocket 服务器地址：

```
ws://localhost:8081
```

你可以参考[vite env](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)来修改默认值。

```shell
npm run docker-build
```

```shell
docker run -p 8080:8080 -d online-drawer/front-end
```
