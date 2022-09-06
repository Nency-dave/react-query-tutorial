import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${heroId}`);
};

export const DynamicParellel = ({ heroIds }) => {
  const queryResult = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["dyanamic-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  return (
    <>
      <h1>Dynamic Parallel</h1>
      {queryResult?.map((h) => {
        return (
          <div>
            {h.data?.data?.name}---{h.data?.data?.username}---
            {h.data?.data?.email}
          </div>
        );
      })}
    </>
  );
};
