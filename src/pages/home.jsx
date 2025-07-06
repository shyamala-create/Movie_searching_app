import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const API_URL = "http://www.omdbapi.com/?apikey=e8df346b";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = API_URL + "&s=" + encodeURIComponent(searchTerm);
        if (type) {
          url += `&type=${type}`;
        }
        url += `&page=${page}`;
        const response = await axios.get(url);
        setData(response.data.Search || []);
        setTotalCount(Number(response.data.totalResults));
      } catch (error) {
        setData([]);
        setTotalCount(0);
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm, page, type]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <>
    {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-900 to-blue-600 py-6 shadow flex flex-col items-center mb-8">
        <div className="flex items-center gap-4">
          <img src="/movie.svg" alt="Movie Icon" className="w-12 h-12" />
          <h1 className="text-4xl font-bold text-white tracking-wide">Movie Search</h1>
        </div>
        <p className="text-blue-100 mt-2 text-lg">Find your favorite movies, series, and episodes</p>
      </header>

      {/* search bar card*/}
      <div className="flex flex-col md:flex-row text-3xl justify-center items-center m-10 gap-6">
        <strong>Search:</strong>
        <div className="border black rounded w-250">
          <input
            type="text"
            placeholder="Enter movie name..."
            value={searchTerm}
            onChange={handleOnChange}
            className="border rounded px-4 py-2 w-full md:w-80 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <select
         className="border rounded px-4 py-2 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>

      {/*Movie Grid or Empty space*/}
      <div className="min-h-[40vh] bg-gray-50 py-8 px-2 rounded-xl max-w-7xl mx-auto" >
        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item) => (
                <div
                  key={item.imdbID}
                  className="bg-white border shadow-lg rounded-xl flex flex-col justify-between items-center gap-3 p-4 transition-transform hover:scale-105 hover:shadow-2xl min-h-[420px]"
                >
                  <Link
                    to={`/movie-details/${item.imdbID}`}
                    state={item}
                    className="text-2l text-blue-400 underlined"
                  >
                    View Movie Details
                  </Link>
                  <strong className="text-xl">Title: {item.Title}</strong>
                  <strong>Year: {item.Year}</strong>
                  <strong>Type: {item.Type}</strong>
                  <img src={item.Poster} />
                </div>
              ))}
            </div>
            {/* pagination controls*/}
            <div className="flex justify-center items-center text-xl gap-6 m-10">
              <button
                className="rounded shadow p-3 pointer"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {Math.ceil(totalCount / 10) || 1}
              </span>
              <button
                className="rounded shadow p-3 pointer"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(totalCount / 10)}
              >
                Next
              </button>
            </div>
          </>
        ) : searchTerm ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <img src="/movie.svg" alt="No Results" className="w-24 h-24 opacity-30 mb-4" />
            <h1 className="text-3xl text-gray-500">No Movies/Series Found</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <img src="/movie.svg" alt="Search" className="w-24 h-24 opacity-30 mb-4" />
            <h1 className="text-2xl text-gray-400">Enter your favorite movie in the search box to see!!</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
