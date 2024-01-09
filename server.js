// This is going to create a modular web application using node.js express routers
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Web Server is listening on port ${port}`);
});
