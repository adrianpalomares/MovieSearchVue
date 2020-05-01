const movies = new Vue({
    el: "#movies",
    data: {
        moviesData: [],
        searchQuery: "",
        hasMovieDetail: false,
        movieDetail: {}
    },
    computed: {},
    methods: {
        getSearchResults: async function() {
            const searchResult = await axios.get(`http://localhost:8080/api/search/${this.searchQuery}`);
            this.moviesData = searchResult.data;
        },
        getMovieDetails: async function(e) {
         	const movieId = e.currentTarget.getAttribute('movie-id');
            const movieDetailResponse = await axios.get(`http://localhost:8080/api/movie/${movieId}`);
            this.hasMovieDetail = true;
            this.movieDetail = movieDetailResponse.data;
        }
    },
    created: async function() {
        const moviesList = await axios.get("http://localhost:8080/api/topmovies");
        this.moviesData = moviesList.data.data;
    }
})