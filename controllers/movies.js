const { ajaxRequest } = require("../utils/ajax-request");

// Controller to get all the movies
exports.handleGetMovies = async (request, response) => {
  ajaxRequest("https://swapi.dev/api/films/", (data, err) => {
    if (err) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: err.error }));
      return false;
    }
    const { results } = data;
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
        message: "Movies gotten",
        results: results.map(i => {
          return {
            title: i.title,
            openingCrawl: i.opening_crawl,
            characters: i.characters
          }
        })
    }));
  });
};
