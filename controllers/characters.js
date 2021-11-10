const { ajaxRequest } = require("../utils/ajax-request");

const charactersURL = "https://swapi.dev/api/people/";

// Controller to get all the characters
// GET - request
exports.handleGetCharacters = async (request, response) => {
  ajaxRequest(charactersURL, (data, err) => {
    if (err) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: false,
        message: err.error
      }));
      return false;
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      success: true,
      message: "Characters gotten",
      results: data
    }));
  });
};

// Controller to get a character by name
// GET - request
exports.handleFilterCharacter = async (request, response, queryParams) => {
  ajaxRequest(charactersURL, (data, err) => {
    if (err) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: false,
        message: err.error
      }));
      return false;
    }
    const { results } = data;
    const filteredCharacters = results.filter(i => i.gender === queryParams);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      success: true,
      message: "Your filter for gender of " + queryParams,
      results: {
        matchedResults: filteredCharacters.length,
        characters: filteredCharacters
      },
      query: queryParams
    }));
  })
};

// Controller to sort a given paramenter
// GET - request
exports.handleSortByParams = async (request, response, queryParams) => {
  ajaxRequest(charactersURL, (data, err) => {
    if (err) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: false,
        message: err.error
      }));
      return false
    }
    const { results } = data;
    if (queryParams === "name") {
     const sortResult = results.sort(function(a, b) {
        const nameA = a.name;
        const nameB = b.name;
        if(nameA < nameB) {
          return -1
        }
        if(nameA > nameB) {
          return 1
        }
        return 0
      });
      console.log(sortResult)
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: true,
        message: "Characters sorted by names",
        results: sortResult
      }))
    }

    if (queryParams === "gender") {
     const sortResult = results.sort(function(a, b) {
        const genderA = a.gender;
        const genderB = b.gender;
        if(genderA < genderB) {
          return -1
        }
        if(genderA > genderB) {
          return 1
        }
        return 0
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: true,
        message: "Characters sorted by gender",
        results: sortResult
      }))
    }

    if (queryParams === "height") {
     const sortResult = results.sort(function(a, b) {
        const heightA = a.height;
        const heightB = b.height;
        if(heightA < heightB) {
          return -1
        }
        if(heightA > heightB) {
          return 1
        }
        return 0
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        success: true,
        message: "Characters sorted by height",
        results: sortResult
      }))
    }
  })
};
