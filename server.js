// -- This is code from DigitalOcean tutorial on how to create a web server using node.js --
// const http = require("http");
// const host = "localhost";
// const port = 3000;

// const requestListener = function (req, res) {
// 	res.writeHead(200);
// 	res.end("My first server!");
// };

// const server = http.createServer(requestListener);
// This is going to create a modular web application using node.js express routers
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Web Server is listening on port ${port}`);
});
