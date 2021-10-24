import express from "express";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";
const __dirname = path.resolve();
dotenv.config();
const server = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
/* route requests for static files to appropriate directory */
server.use(express.static(__dirname + "/public"));
server.use(express.json());

/* other routes defined before catch-all */
server.post("/quick-email", (req, res) => {
	console.log("quick email in contact");
	console.log(req.body);
	axios
		.post(process.env.API + "/quick-email", req.body)
		.then((response) => {
			console.log(response.data);
			res.send(response.data);
		})
		.catch((error) => {
			console.error(response.data);
			res.send(JSON.stringify({ error: error, status: 500 }));
		});
});

server.post("/full-email", (req, res) => {
	console.log("FULL EMAIL");
	console.log(req.body);
	axios
		.post(process.env.API + "/text-email", req.body)
		.then((response) => {
			console.log(response.data);
			res.send(response.data);
		})
		.catch((error) => {
			console.error(response.data);
			res.send(JSON.stringify({ error: error, status: 500 }));
		});
});

/* final catch-all route to index.html defined last */
server.get("/*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

const port = 8000;
server.listen(port, function () {
	console.log("server listening on port " + port);
});
