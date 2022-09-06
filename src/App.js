import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHero.page";
import { SuperHeroesPage } from "./components/SuperHero.page";
import { RQSuperHeroPageDetail } from "./components/RQSuperHeroPageDetail";
import { ParellelQueries } from "./components/ParellelQueries.page";
import { DynamicParellel } from "./components/DynamicParellel.page";
import { DependentQueries } from "./components/DependentQueries.page";
import { PaginateQueries } from "./components/PaginateQueries.page";
import { InfiniteQueries } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/parallel-query">Parallel Query</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">Dynamic Parallel Queries </Link>
              </li>
              {/* <li>
                <Link to="/rq-dependent">Dependent Queries </Link>
              </li> */}
              <li>
                <Link to="/rq-paginate">Paginate Queries </Link>
              </li>
              <li>
                <Link to="/rq-infinite">Infinite Queries </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPageDetail />}
            ></Route>

            <Route
              path="/rq-dependent"
              element={<DependentQueries email="Sincere@april.biz" />}
            ></Route>

            <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>

            <Route path="/rq-paginate" element={<PaginateQueries />}></Route>

            <Route path="/rq-infinite" element={<InfiniteQueries />}></Route>

            <Route path="/parallel-query" element={<ParellelQueries />}></Route>

            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParellel heroIds={[1, 3]} />}
            ></Route>

            <Route
              path="/rq-super-heroes"
              element={<RQSuperHeroesPage />}
            ></Route>

            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
