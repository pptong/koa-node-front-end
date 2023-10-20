##  KOA 后端分层开发架构实践-前端项目

* * *


### 后端项目
对应的前端项目请请进入
https://github.com/pptong/koa-node


### 项目启动

安装项目所需要的依赖

```shell
npm install
```


在 `./vite.config.ts` 中设置后台地址
```shell
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
```

启动开发模式
```shell
npm run dev
```
