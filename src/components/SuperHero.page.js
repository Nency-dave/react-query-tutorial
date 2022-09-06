import { useState, useEffect } from "react";
import axios from "axios";

export const SuperHeroesPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return "Loading data...";
  if (error) return `Error reason is :${error}`;

  return (
    <>
      <h2>Super Heroes Page </h2>
      {data.map((hero) => {
        return (
          <ul key={hero.id}>
            <li>{hero.name}</li>
          </ul>
        );
      })}
    </>
  );
};
