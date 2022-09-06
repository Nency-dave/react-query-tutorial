import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const onSuccess = (data) => {
    // console.log("Sucess...", data);
  };
  const onError = (error) => {
    console.log("Error...", error);
  };

  const { mutate: addHero } = useAddSuperHeroData();
  const handleAddHero = () => {
    console.log({ name, username });
    const hero = { name, username };
    addHero(hero);
  };
  console.log(addHero, "addhero");
  const { data, isLoading, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
  // console.log({
  //   isLoading,
  //   isFetching,
  // });

  if (isLoading || isFetching) return "Loading....";
  if (isError) return <h1>{error.message}</h1>;
  //console.log(data);
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type=" text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type=" text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero </button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {/* useQuery on click  */}
      {data?.data.map((hero) => {
        return (
          <ul key={hero.id}>
            <li>
              <Link
                to={`/rq-super-heroes/${hero.id}`}
                style={{ textDecoration: "none" }}
              >
                {hero.name}
              </Link>
            </li>
          </ul>
        );
      })}
      {/* {data?.map((filtername) => {
        return (
          <ul key={filtername}>
            <li>{filtername}</li>
          </ul>
        );
      })} */}
    </>
  );
};
