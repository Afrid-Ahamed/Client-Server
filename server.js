import http2 from "http2";
import url from "url";

let books = [];

const getBooks = (stream, headers) => {
  const path = headers[":path"];
  const queryObject = url.parse(path, true).query;
  const title = queryObject.title;

  console.log("Book title requested: " + (title !== null ? title : "N/A"));

  stream.respond({
    ":status": 200,
  });

  if (title !== null) {
    const index = books.findIndex((book) => book.title === title);

    if (index > -1) {
      stream.end(books.find((book) => title === book.title));
    } else {
      stream.end("Book with the requested title isn't found!");
    }
  } else {
    stream.end(books);
  }
};

const postBook = (stream, headers) => {
  let body = "";

  stream.on("data", (data) => {
    body += data;
  });

  stream.on("end", () => {
    body = JSON.parse(body);
    body.forEach((book) => {
      books[book.title] = book.author;
    });

    stream.respond({
      ":status": 200,
    });

    stream.end("Added book!");

    console.log(books);
  });
};

const notFoundHandler = (stream, headers) => {
  stream.respond({
    ":status": 404,
  });
  stream.end("Path not found!");
};

const router = (stream, headers) => {
  const path = headers[":path"];
  const method = headers[":method"];

  let handler;

  if (path === "/" && method === "POST") {
    handler = postBook;
  } else if (
    path.startsWith("/") &&
    path.includes("title") &&
    method === "GET"
  ) {
    handler = getBooks;
  } else {
    handler = notFoundHandler;
  }

  return handler(stream, headers);
};

const server = http2.createServer();
server.on("stream", router);
server.listen(8000, () => console.log("Server is listening on port 8000"));
