import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const HomePage = () => {
  const onSuccess = () => {
    // console.log("Home page success message");
  };
  const onError = () => {
    //console.log("Home Page Error message");
  };

  const { isLoading, data, isFetching, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );
  if (isFetching || isLoading) return <h1>Loading....</h1>;
  // console.log(data, "home data");
  return (
    <>
      <div>Home Page</div>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.map((hero) => {
        return (
          <ul key={hero}>
            <li>{hero}</li>
          </ul>
        );
      })}
    </>
  );
};
