const Koa = require("koa");
const Router = require("koa-router");

const fs = require("fs");
const path = require("path");

const imgPath = path.join(__dirname, "../imgs/0.jpg");
const img = fs.readFileSync(imgPath);
const app = new Koa();
const router = new Router();

app.use((ctx, next) => {
  console.log(ctx.method);
  next();
});

router.get("/getData", (ctx, next) => {
  console.log("收到getData请求");
  ctx.body = { name: "get" };
  next();
});
router.get("/getImg", (ctx, next) => {
  console.log("收到图片请求");
  ctx.body = img;
  next();
});
router.get("/getJsonp", (ctx, next) => {
  console.log("收到getJsonp请求");
  let obj = { name: "jsonp" };
  let res = `${ctx.query.callback}(${JSON.stringify(obj)})`;
  console.log(res);
  ctx.body = res;
  next();
});
router.post("/postData", (ctx, next) => {
  console.log("收到postData请求");
  ctx.body = { name: "post" };
  next();
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(9000, () => {
  console.log("服务启动:::9000");
});
