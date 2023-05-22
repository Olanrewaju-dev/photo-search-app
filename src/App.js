/* eslint-disable react-hooks/exhaustive-deps */
// importing react and state hooks
import React, { useState, useEffect } from "react";

// importing css file
import "./index.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  // declaring API endpoint
  const url = `${process.env.REACT_APP_API_URL}?page=1&query=${query}&client_id=${process.env.REACT_APP_API_KEY}`;

  // function fetching data from API endpoint using Async/Await
  const fetchPhotos = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(res.statusText);
        const data = await res.json();
        const finalData = data.results;
        console.log(finalData);
        setPhotos(finalData);
      } else {
        throw new Error("Error " + res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to trigger API data fetch once the submit button is clicked
  const Submit = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetchPhotos();
    setQuery("");
  };

  useEffect(() => {
    fetchPhotos();
    console.log("useEffect worked!!!");
  }, []);

  // returning jsx element to the browser
  return (
    <>
      <main className="container">
        <h2>Photo Search App</h2>
        {/* FORM SECTION */}
        <form>
          <input
            type="text"
            placeholder={`Type any input`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick={Submit}>
            Search
          </button>
        </form>
        <div className="img_container">
          {/* MAPPING THROW THE API DATA DUMP */}
          {photos.map((photo) => {
            return (
              <div className="grid-item">
                <img
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
                <p>
                  <b>Credit:</b> {photo.user.name}
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <p>
          Made by{" "}
          <span>
            <a href="https://github.com/Olanrewaju-dev">Oladev</a>
          </span>
        </p>
      </footer>
    </>
  );
};

export default App;
