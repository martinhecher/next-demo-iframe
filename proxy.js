const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    // target: "https://app.inkdesk.com",
    target: "https://app.responseiq.com",
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
  })
);

// app.use(
//   "/",
//   //   (req, res, next) => {
//   //     console.log("Incoming request:", req.method, req.url);
//   //     next();
//   //   },
//   createProxyMiddleware({
//     target: "https://app.responseiq.com",
//     changeOrigin: true,
//     secure: false,
//     // pathRewrite: { "^/riq": "" },
//     selfHandleResponse: true, // Handle the response manually
//     onProxyRes: (proxyRes, req, res) => {
//       console.log("onProxyRes", proxyRes.statusCode);
//       // Intercept and rewrite redirects
//     //   if (
//     //     proxyRes.statusCode >= 300 &&
//     //     proxyRes.statusCode < 400 &&
//     //     proxyRes.headers.location
//     //   ) {
//     //     proxyRes.headers.location = proxyRes.headers.location.replace(
//     //       "https://app.responseiq.com",
//     //       "http://localhost:3001/"
//     //     );
//     //   }

//       // Pass through the response data
//       proxyRes.pipe(res);
//     },
//     // onProxyReq: (proxyReq, req, res) => {
//     //   console.log(
//     //     `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
//     //   );

//     //   // Check if we need to set the cookie
//     //   if (shouldSetCookie(req)) {
//     //     const cookieValue = `CAKEPHP=${sessionToken}; Domain=app.responseiq.com; Path=/; Expires=${getTwoWeeksFromNow()}; HttpOnly; Secure; SameSite=Lax`;
//     //     proxyReq.setHeader("Cookie", cookieValue);

//     //     // Also set the cookie in the response
//     //     res.setHeader("Set-Cookie", cookieValue);

//     //     console.log("Cookie set:", cookieValue);
//     //   }
//     // },
//   })
// );

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
