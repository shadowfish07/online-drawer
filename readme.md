# online-drawer

一个支持多人同时编辑的画板程序。

---

## Todos

1. [ ] Readme 在触发 Github Action 后基于 Tag 进行更新
2. [ ] 添加使用 docker-compose 的构建+部署方式

## dev

启动 dev 环境（开启前后端服务）：

```shell
npm run dev
```

## build

docker 构建：

```shell
npm run docker-build
```

## run/deploy

### 构建镜像

#### 本地构建

```shell
npm run docker-build
```

#### 从 docker hub 拉取镜像：

```shell
docker pull ghcr.io/shadowfish07/online-drawer/front-end:0.0.4
docker pull ghcr.io/shadowfish07/online-drawer/websocket-server:0.0.4
```

### 运行

```shell
docker network create online-drawer ## 初次运行，需要创建docker network
docker run -p 8081:8081 -d --name online-drawer-websocket-server --network online-drawer online-drawer/websocket-server ## 如果是从docker hub拉取的镜像，这里的镜像名应相应替换
docker run -p 8080:8080 -d --name online-drawer-front-end --network online-drawer online-drawer/front-end ## 如果是从docker hub拉取的镜像，这里的镜像名应相应替换
```

#### 注意

```shell
docker run -p 8081:8081 -d --name online-drawer-websocket-server --network online-drawer online-drawer/websocket-server
```

这里的 container name 在`front-end`中的`default.conf`中有用到，如要修改其值，需要同步进行修改。
