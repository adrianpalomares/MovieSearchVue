const superagent = require("superagent");
const config = require("./config.json");

async function search(query) {
    // Response from api
    const searchResponse = await superagent.get(
        `${config.url}${config.apiKey}&s=${query}`
    );

    // Getting results from the response
    const searchResults = searchResponse.body.Search;

    return searchResults;
}

async function getMovieById(movieId) {
    const searchResponse = await superagent.get(
        `${config.url}${config.apiKey}&i=${movieId}`
    );

    return searchResponse.body;
}

module.exports = {
    search,
    getMovieById
};
