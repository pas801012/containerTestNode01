var express = require("express");
var app = express();
var workdir = "public";
var uploadDir = "upload";
var uploadLocation = [workdir, uploadDir].join("/"); //public/upload

const fs = require("fs");

app.use(express.static(workdir));

app.post("/upload", (req, res) => {
  let fileName = Math.random().toString("36");
  let fileLocation = [uploadLocation, fileName].join("/"); //`upload/${fileName}`;
  let fileStream = fs.createWriteStream(fileLocation);

  req.pipe(fileStream);
  req.on("end", () => {
    res.end([uploadLocation, fileName].join("/")); // public/upload/{fileName}
  });
});

app.get("/upload", (req, res) => {
  const fileNames = fs.readdirSync(uploadLocation);
  console.log("filenames", fileNames);
  res.send(JSON.stringify(fileNames.map()));
});

console.log(fs.readdirSync(uploadLocation));
// fs.readdirSync(uploadLocation);
console.log("this is test ", uploadLocation);

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});

// var http = require("http");

// //create a server object:
// http
//   .createServer(function(req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080
