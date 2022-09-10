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
  return (
    <>
      <div>Home Page</div>
      <button onClick={refetch}>Fetch heroes</button>
      {data && data.data.map((hero, index) => {
        return (
          <ul key={index}>
            <li>{hero.name}</li>
          </ul>
        );
      })}
    </>
  );
};
