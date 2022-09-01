# online-drawer/websocket-server

这是一个支持在线多人编辑的画板（ws 服务器部分）。

## dev

```shell
npm install
npm run dev
```

## build

### node

```shell
npm install
```

```shell
node index.mjs
```

### docker

默认端口号：`8081`

```shell
npm run docker-build
```

```shell
docker run -p 8081:8081 -d online-drawer/websocket-server
## 若要改变默认端口号
docker run -e PORT=10000 -p 8081:10000 -d online-drawer/websocket-server
```
