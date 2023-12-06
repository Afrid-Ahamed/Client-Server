// import http2 from "http2";

import http2 from "http2";

const session = http2.connect("http://localhost:8000");

// Firstly data will be sent to the server using POST method followed by it's retrieval
// based on a book's title or the entire books object array

// ********** POST book(s) to the server **********

// const postReq = session.request({ ":path": "/", ":method": "POST" });
// postReq.write(
//   JSON.stringify([
//     { title: "Frankenstein", author: "Mary Shelley" },
//     { title: "Demo", author: "Afrid" },
//   ]),
//   "utf8"
// );
// postReq.end();

// postReq.on("response", (headers) => console.log(headers));
// postReq.setEncoding("utf8");
// postReq.on("data", (data) => console.log(data));

// ********** GET book(s) based on the title **********

// To be used only after the POST is done, so it would be commented for the time being since
// the process is executed from the terminal

const title = "Demo";

const getReq = session.request({
  ":path": `/?title=${title}`,
  ":method": "GET",
});
getReq.end();

getReq.on("response", (headers) => console.log(headers));
getReq.setEncoding("utf8");
getReq.on("data", (data) => console.log(data));
