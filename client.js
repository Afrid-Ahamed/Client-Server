// import http2 from "http2";

// const session = http2.connect("http://localhost:8000");

// const req = session.request({ ":path": "/", ":method": "POST" });

// req.write(
//   JSON.stringify({ title: "Frankenstein", author: "Mary Shelley" }),
//   "utf8"
// );

// req.end();

// req.on("response", (headers) => console.log(headers));
// req.setEncoding("utf8");
// req.on("data", (data) => console.log(data));

import http2 from "http2";

const session = http2.connect("http://localhost:8000");

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

// Get book(s) based on the title

const title = "Demo";

const getReq = session.request({
  ":path": `/?title=${title}`,
  ":method": "GET",
});
// getReq.write(JSON.stringify({ title: "Demo" }), "utf8");
getReq.end();

getReq.on("response", (headers) => console.log(headers));
getReq.setEncoding("utf8");
getReq.on("data", (data) => console.log(data));
