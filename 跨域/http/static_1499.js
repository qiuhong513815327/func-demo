const Koa = require("koa");
const app = new Koa();

const path = require("path");
const url = path.join(__dirname, "../public");
app.use(require("koa-static")(url));

app.listen(1499, () => console.log("服务已开启，端口 1499"));
