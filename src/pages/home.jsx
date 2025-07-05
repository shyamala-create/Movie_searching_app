import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://www.omdbapi.com/?apikey=e8df346b";
const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "&s=" + `${searchTerm}`);
        setData(response.data.Search || []);
        console.log("data:::", response.data.Search);
        return response.data.Search;
      } catch (error) {
        setData([]);
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // https://www.omdbapi.com/?apikey=e8df346b&sbatsman
  // http://www.omdbapi.com/?apikey=e8df346b&s=batman
  return (
    <>
      <div className="flex text-4xl justify-center item-center m-10 gap-6">
        <strong>Search:</strong>
        <div className="border black rounded w-250">
          <input type="text" value={searchTerm} onChange={handleOnChange} />
        </div>
      </div>
      <div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="border shadow rounded flex flex-col justify-center items-center gap-3 p-2"
              >
                <strong className="text-xl">Title: {item.Title}</strong>
                <strong>Year: {item.Year}</strong>
                <strong>Type: {item.Type}</strong>
                <img src={item.Poster} />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-4xl flex justify-center items-center">
            No Movies/Series Found
          </h1>
        )}
      </div>
    </>
  );
};

export default Home;
