import MovieCard from "./components/MovieCard";
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json', // fixed typo: "accepts" → "accept", and lowercase JSON
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [errorMessage, setErrorMessage] = useState(''); // fixed typo: seterrorMessage → setErrorMessage

  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const [trendingMovies, setTrendingMovies] = useState([])

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovie = async (query = '') => {

    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; // fixed "short_by" → "sort_by"

      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error("Failed to fetch movies"); // fixed "Faild" and Error usage
      }

      const data = await response.json();

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Faild to fetch movies')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])

if(query && data.results.length > 0){
  await updateSearchCount(query, data.results[0])
}

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally{
      setIsLoading(false)
    }
  };

  const loadTrendingMovies = async () =>{
    try{
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)
    }catch(error){
      console.error(`error fetching tending movies: ${error}`);

      
    }
  }


  useEffect(() => {
    fetchMovie(debouncedSearchTerm);

  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero banner" /> {/* fixed "baner" typo */}
            <h1>
              Find <span className="text-gradient">Movie</span> You'll Enjoy Without The Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
            {trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ) )}
                </ul>
              </section>
            )}
          <section className="all-movies">
            <h2 className="">All Movies</h2>
            {isLoading ? (
              <Spinner/>
            ): errorMessage ?(
              <p className="text-red-500">{errorMessage}</p>
            ): (
              <ul>
                {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
