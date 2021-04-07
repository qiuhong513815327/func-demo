const Koa = require("koa");
const static = require("koa-static");

const app = new Koa();
const path = require("path");
const url = path.join(__dirname, "../public");
app.use(static(url));

/* 代理配置 start */
const proxy = require("koa2-proxy-middleware"); //引入代理模块
const options = {
  targets: {
    // (.*) means anything
    "/getData": {
      target: "http://127.0.0.1:9000",
      changeOrigin: true
    }
  }
};
app.use(proxy(options));

// const bodyparser = require('koa-bodyparser')
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))

/* 代理配置 end */

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.listen(3006);
console.log("app started at port 3006...");
