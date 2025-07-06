import { useLocation, useParams, useNavigate } from "react-router";
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

  const navigate = useNavigate();
  if (loading) return <div className="text-2xl text-center m-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-2">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition self-start"
      >
        &larr; Back to Search
      </button>
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 max-w-4xl w-full items-center">
        <img
          src={movie?.Poster !== "N/A" ? movie.Poster : "/movie.svg"}
          alt={movie?.Title}
          className="w-60 h-96 object-cover rounded-xl shadow mb-4 md:mb-0"
        />
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-4xl font-bold mb-2 text-blue-900">{movie?.Title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Year: {movie?.Year}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Genre: {movie?.Genre || "Unknown"}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Type: {movie?.Type}</span>
          </div>
          <div className="text-lg text-gray-700 mb-2"><span className="font-semibold">Cast:</span> {movie?.Actors || "Unknown"}</div>
          <div className="text-lg text-gray-700 mb-2"><span className="font-semibold">IMDB Rating:</span> {movie?.imdbRating || "N/A"}</div>
          <div className="text-lg text-gray-700 mb-2"><span className="font-semibold">Plot:</span> {movie?.Plot || "No plot available"}</div>
          {movie?.Ratings && movie.Ratings.length > 0 && (
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
      </div>
    </div>
  );
};

export default MovieDetails;
