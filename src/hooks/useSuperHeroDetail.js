import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroDetail = (heroId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${heroId}`);
};

export const useSuperHeroesDetail = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["super-heroes", heroId],
    () => fetchSuperHeroDetail(heroId),
    {
      initialData: () => {
        const hero = queryClient
          .getQueryData("super-heroes")
          ?.data?.find((hero) => hero.id === parseInt(heroId));
        if (hero) {
          return { data: hero };
        } else {
          return undefined;
        }
      },
    }
  );
};
