import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";


const API_URL = "http://www.omdbapi.com/?apikey=e8df346b";

const MovieDetails = () => {
  const { state: passedMovie } = useLocation();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(passedMovie || null);
  const [loading, setLoading] = useState(!passedMovie);

  useEffect(() => {
    if (!movie && imdbID) {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}&i=${imdbID}`);
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          setMovie(null);
          console.error("Error fetching movie details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [imdbID, movie]);

  console.log("Movie Details:", movie);

  if (loading) return <div className="text-2xl text-center m-10">Loading...</div>;

  return (
    <>
      <div className="flex flex-col text-2xl justify-center items-center m-10 gap-6">
        <h1>Movie details!!!</h1>
        {movie ? (
          <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} className="w-72 md:w-96 rounded shadow mb-4" />
            <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
            <div className="text-xl mb-1">Year: {movie.Year}</div>
            <div className="text-lg mb-1">Genre: {movie.Genre || "No one"}</div>
            <div className="text-lg mb-1">Cast: {movie.Actors || "Unknown"}</div>
            <div className="text-lg mb-1">IMDB Rating: {movie.imdbRating || "Average"}</div>
            <div className="text-lg mb-1">Type: {movie.Type}</div>
            <div className="text-lg mb-1">Plot: {movie.Plot || "No plot available"}</div>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-2">
                <strong>Other Ratings:</strong>
                <ul className="list-disc ml-6">
                  {movie.Ratings.map((r, idx) => (
                    <li key={idx}>{r.Source}: {r.Value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>Movie not found.</div>
        )}
      </div>
      <input />
    </>
  );
};

export default MovieDetails;
