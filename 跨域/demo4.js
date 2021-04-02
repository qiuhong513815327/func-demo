// http-proxy-middleware
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(
  "/getData",
  createProxyMiddleware({
    target: "http://127.0.0.1:9000",
    changeOrigin: true
  })
);
app.use(
  "/postData",
  createProxyMiddleware({
    target: "http://127.0.0.1:9000",
    changeOrigin: true
  })
);
app.listen(7000, () => {
  console.log("服务启动:::7000");
});
