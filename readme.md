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

---

如果是部署在远程服务器上，上述方法执行完成后可通过`服务器IP:8080`访问到 online-drawer。如果需要用域名访问，则需要再配置一层 Nginx 反代，如宝塔面板提供的反代配置：

```
location /
{
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;

    add_header X-Cache $upstream_cache_status;

    #Set Nginx Cache

    	add_header Cache-Control no-cache;
}
```

此时，虽然可以通过域名访问到 online-drawer，但 online-drawer 的 websocket 服务不可用。

解决办法：

参考`front-end`中的`default.conf`配置，添加：

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

## 上面是要添加的配置，注意与server同级

server {
    ...

    location / {
        ...
    }

    ## START 要添加的配置，注意与location同级
    location /ws {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
    }
    ## END 要添加的配置

    ...
}
```
