import { useSuperHeroesDetail } from "../hooks/useSuperHeroDetail";
import { useParams } from "react-router-dom";

export const RQSuperHeroPageDetail = () => {
  const { heroId } = useParams();

  const { data, isLoading, isFetching, isError, error } =
    useSuperHeroesDetail(heroId);

  if (isFetching || isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <h1>Detail Of Heroes</h1>
      <p>name:{data?.data.name}</p>
      <p>Username:{data?.data.username}</p>
    </>
  );
};
