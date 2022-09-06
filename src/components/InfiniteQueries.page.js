import React from "react";

import axios from "axios";

import { useInfiniteQuery } from "react-query";
import { Fragment } from "react/cjs/react.production.min";

const fetchUserName = ({ pageParam = 1 }) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?_limit=2&_page=${pageParam}`
  );
};

export const InfiniteQueries = () => {
  const {
    data,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["usernames"], fetchUserName, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) return <h1>Loading....</h1>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h1>Infinite</h1>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((uname) => {
                console.log(uname, "unmae");
                return (
                  <h1 key={uname.id}>
                    {uname.id}.{uname.username}
                  </h1>
                );
              })}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More !
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? " fetching.... " : null}</div>
    </>
  );
};
