const SearchHistoryComponent = {
    template: `<div class="search-history-section pb-2 mt-4"><h3>Search History</h3><ul><li v-for="s in searchHistory" style="list-style:none;"><a class="mb-2"@click="handleClick">{{ s }}</a></li></ul></div>`,
    props: ['searchHistory', 'getSearchResultsByQuery'],
    methods: {
        handleClick: function(e) {
            // Call on function passed through props. Comes from movies(main component)
            this.getSearchResultsByQuery(e.currentTarget.innerText);
        }
    }
    
};

const movies = new Vue({
    el: "#movies",
    data: {
        moviesData: [],
        searchQuery: "",
        hasMovieDetail: false,
        movieDetail: {},
        searchHistory: [], // Represent a set
    },
    computed: {
        numOfMovies: function() {
            if (this.searchHistory.length == 0) {
                return 0;
            } else {
                return this.moviesData.length
            }
        }
    },
    methods: {
        getSearchResults: async function() {
            const searchResult = await axios.get(`api/search/${this.searchQuery}`);
            this.moviesData = searchResult.data;
            // Check for duplicates
            if (!this.searchHistory.includes(this.searchQuery)) {
                this.searchHistory.push(this.searchQuery);
            }
            this.searchQuery = "";
        },
        getMovieDetails: async function(e) {
         	const movieId = e.currentTarget.getAttribute('movie-id');
            const movieDetailResponse = await axios.get(`api/movie/${movieId}`);
            this.hasMovieDetail = true;
            this.movieDetail = movieDetailResponse.data;
        },
        getSearchResultsByQuery: async function(query) {
            const searchResult = await axios.get(`api/search/${query}`);
            this.moviesData = searchResult.data;
            // Check for duplicates
            if (!this.searchHistory.includes(this.searchQuery)) {
                this.searchHistory.push(this.searchQuery);
            }


        }
    },
    created: async function() {
        const moviesList = await axios.get("api/topmovies");
        this.moviesData = moviesList.data.data;
    },
    components: {
        'search-history-component': SearchHistoryComponent
    }
})