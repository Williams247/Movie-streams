// Imports
const http = require("http");
const url = require("url");
const movies = require("./controllers/movies");
const characters = require("./controllers/characters");
const port = process.env.PORT || 5000;

const server = http.createServer((request, response) => {
  // CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Max-Age', 2592000);

  // URL object
  let nodeURL = url.parse(request.url, true);

  // Routes
  if (request.url === "/get-starwars-movies" && request.method === "GET") {
    movies.handleGetMovies(request, response);
  } else if (request.url === "/get-characters" && request.method === "GET") {
    characters.handleGetCharacters(request, response);
  }
  else if (nodeURL.pathname === '/get-characters' && nodeURL.search.slice(0, 15) === "?filterByGender" && request.method === "GET") {
    characters.handleFilterCharacter(request, response, nodeURL.query.filterByGender)
  }
  else if (nodeURL.pathname === '/get-characters' && nodeURL.search.slice(0, 7) === "?sortBy" && request.method === "GET") {
    characters.handleSortByParams(request, response, nodeURL.query.sortBy)
  }
  else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      success: false,
      message: "Route not found"
    }));
  }
});

// Server running port
server.listen(port, () => console.log("Server running on PORT " + port));
