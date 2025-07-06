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
        const response = await axios.get(API_URL + "&s=" + `${searchTerm}`);
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
      <div className="flex flex-col md:flex-row text-3xl justify-center items-center m-10 gap-6">
        <strong>Search:</strong>
        <div className="border black rounded w-250">
          <input
            type="text"
            placeholder="Enter movie name..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </div>
        <select
          className="border black rounded shadow text-gray-500 w-100"
          value={type}
          onChange={e => { setType(e.target.value); setPage(1); }}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div>
        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item) => (
                <div
                  key={item.imdbID}
                  className="border shadow rounded flex flex-col justify-center items-center gap-3 p-2"
                >
                  <Link to={`/movie-details/${item.imdbID}`} state={item} className="text-2l text-blue-400 underlined">View Movie Details</Link>
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
              <span>Page {page} of {Math.ceil(totalCount / 10) || 1}</span>
              <button
                className="rounded shadow p-3 pointer"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(totalCount / 10)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-3xl flex justify-center items-center">
            No Movies/Series Found
          </h1>
        )}
      </div>
    </>
  );
};

export default Home;
