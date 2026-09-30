const http = require("http");

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(
    JSON.stringify({
      application: "Zero Downtime Deployment Demo",
      version: "v1",
      message: "Hello from version 1!"
    })
  );
});

server.listen(PORT, () => {
  console.log(`Version 1 running on http://localhost:${PORT}`);
});