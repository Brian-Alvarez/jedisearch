import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import "./App.css";

const ResultSet = (props) => {
  const { characters } = props;

  //check first that the array isn't empty, otherwise proceed to display results
  if (characters.length > 0) {
    const charhtml = characters.map((character) => (
      <li id={character.url}>
        {character.name} was born in {character.birth_year}
      </li>
    ));
    return <ul>{charhtml}</ul>;
  } else {
    return <h3>No search results yet</h3>;
  }
};

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [requests, setRequests] = useState(0);
  const [cachedRes, setCachedRes] = useState(new Map());
  const [cachedChars, setCachedChars] = useState(new Map());

  const baseUrl = "https://swapi.dev/api/";

  //updates search bar when input changes, 1 sec after last keystroke
  const handleChange = _.debounce((event) => {
    setSearch(event.target.value);
  }, 1000);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}people/?search=${search}`)
      .then((response) => {
        //updates results, loading, and API requests count
        setResults(response.data.results);
        setLoading(false);
        setRequests(requests + 1);

        const charIds = response.data.results.map((result) =>
          //using people id from url to better cache and normalize results
          result.url
            .slice(0, result.url.length - 1)
            .split("/")
            .pop()
        );
        //mapping search results to character Ids, and char IDs to data
        setCachedRes(cachedRes.set(search, charIds));
        setCachedChars(cachedChars.set(charIds, response.data.results));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isMounted = useRef(false);
  //use of flag to prevent api query on initial render
  useEffect(() => {
    if (isMounted.current) {
      //checks to see if the query is in cache, otherwise proceeds with api request
      if (cachedRes.has(search)) {
        let key = cachedRes.get(search);
        setResults(cachedChars.get(key));
      } else if (!(search === "")) {
        fetchData();
      } else {
        setResults([]);
      }
    }
    isMounted.current = true;
  }, [search]);

  return (
    <div>
      <header>
        <input autoFocus onChange={handleChange} />
      </header>
      {loading ? <h2>Loading...</h2> : ""}
      <>
        <div>
          <h3>Search Results</h3>
          <div className="totalRequests">
            ({requests} requests executed so far)
          </div>
          <div>
            <ResultSet characters={results} />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
