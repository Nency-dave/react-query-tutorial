import { useQueries, useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};
const fetchPost = () => {
  return axios.get(
    "http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5"
  );
};

export const ParellelQueries = () => {
  const { data: superhero } = useQuery("super-heroes", fetchSuperHero);
  const { data: post } = useQuery("post", fetchPost);

  return (
    <div>
      {superhero?.data.map((hero) => {
        return (
          <ul>
            <li>{hero.name}</li>
          </ul>
        );
      })}

      {post?.data.map((post) => {
        return <p>{post.title}</p>;
      })}
    </div>
  );
};
