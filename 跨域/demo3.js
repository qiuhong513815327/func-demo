const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const allowCors = async (ctx, next) => {
  ctx.set({
    "Access-Control-Allow-Origin": "http://127.0.0.1:8088", // 我这里的本地服务插件设置的端口号为8088
    "Access-Control-Allow-Headers": "Content-Type"
  });
  next();
};
app.use(allowCors);

router.get("/getData", (ctx, next) => {
  console.log("收到请求");
  ctx.body = { name: "get" };
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
