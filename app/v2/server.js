const http = require("http");

const PORT = 3002;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(
    JSON.stringify({
      application: "Zero Downtime Deployment Demo",
      version: "v2",
      message: "Hello from version 2!"
    })
  );
});

server.listen(PORT, () => {
  console.log(`Version 2 running on http://localhost:${PORT}`);
});