import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchUserName = (pageNumber) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?_limit=2&_page=${pageNumber}`
  );
};

export const PaginateQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["usernames", pageNumber],
    () => fetchUserName(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <h1>Loading....</h1>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <div>Pagination</div>
      <div>
        {data?.data.map((uname) => {
          console.log(uname);
          return (
            <ul key={uname.id}>
              <li>
                {uname.id}--{uname.username}
              </li>
            </ul>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>

        {pageNumber}

        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next page
        </button>
      </div>
    </>
  );
};
