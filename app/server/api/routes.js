const express = require("express");
const router = express.Router();
const axios = require("axios");

// Require moviesearch module
const movieSearch = require('moviesearch');

/*

This route is used to get results that contain a given query

*/
router.get("/search/:query", async (request, response) => {
    const query = request.params.query;
    try {
        const searchResults = await movieSearch.search(query);
        response.json(searchResults);
    } catch (err) {
        response.json({ err });
    }
});

/*

This route is to get more in-depth result on given movie
Uses the imdbID field from /search route

*/
router.get("/movie/:id", async (request, response) => {
    try {
        const movieData = await movieSearch.getMovieById(request.params.id);
        response.json(movieData);
    } catch (err) {
        response.json({ err });
    }
});

/*

This route is used for getting the top movies.
Will be used on homepage.

*/

router.get("/topmovies", async (request, response) => {
    // Current top movies; hard-coded from rotten tomato
    const currTopMovieTitles = ['Black Panther', 'Avengers:Endgame', 'Us', 'Toy Story 4', 'Lady Bird', 'Mission Impossible-Fallout',
        'The Wizard of Oz', 'The Irishman'
    ];

    // The object that will be sent back
    let responseObject = {data:[]};

    // Requesting information on each of the movie title in the currTopMovieTitles array
    for (let i = 0; i < currTopMovieTitles.length; i++) {
        const movieSearchResult = await axios.get(`http://localhost:8080/api/search/${currTopMovieTitles[i]}`);
        responseObject.data.push(movieSearchResult.data[0]);
    }
    
    response.json(responseObject);
})

module.exports = router;