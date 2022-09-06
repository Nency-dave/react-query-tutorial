import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

const fetchSuperHeroes = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

const addSuperHero = (hero) => {
  console.log(hero, "hero...");
  //jsonplaceholder we are using, thats why it doesnt work but code steps is perfect
  return axios.post("https://jsonplaceholder.typicode.com/users", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  const { pathname } = useLocation();
  return useQuery("super-heroes", fetchSuperHeroes, {
    //cacheTime: 5000, //query cache
    //staleTime: 0, //stale time
    // refetchOnMount: true, //re-fetch defaults
    //refetchOnWindowFocus: true, //refetch defaults
    //refetchInterval: 2000, //data fetching in every 2 seconds
    //enabled: false,
    onSuccess,
    onError,
    // select: (data) => {
    //   const result = data.data.map((names) => names.name);
    //   const filter = result.filter((filtername) => filtername.length > 15);
    //   return filter;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); //query-invalidation
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
    //   }
    //   ); //handling mutation response
    // },

    //############## optimistic update ############
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero.data },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
