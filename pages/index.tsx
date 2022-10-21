import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export interface IMovie {
  id: number;
  original_title: string;
  poster_path: string;
}

interface IHomeProps {
  results: IMovie[];
}

const Home = ({ results }: IHomeProps) => {
  const router = useRouter();
  const onClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);

    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       title,
    //     },
    //   },
    //   `/movies/${id}`
    // );
    //*router.push(url, as, options)

    // 클라이언트 측 전환을 처리합니다. 이 방법은 next/link가 충분하지 않은 경우에 유용합니다.
    // url: UrlObject | String: 탐색할 URL
    // as: UrlObject | String: 브라우저 URL 표시줄에 표시될 경로에 대한 선택적 데코레이터입니다.

    //     + 외부 URL에 대해서는 router.push()를 사용할 필요가 없습니다.
    // window.location을 사용하는 것이 더 적합합니다.
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {!results && <h4>Loading...</h4>}
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title} </a>
            </Link>
          </h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();

  return {
    props: {
      results,
    },
  };
};

//*getServerSideProps

// request time에 반드시 데이터를 fetch해와야 하는 페이지를 pre-render해야 하는 경우에만 getServerSideProps를 사용해야 합니다.
// 데이터를 pre-render할 필요가 없다면 client side에서 데이터를 가져오는 것을 고려해야 합니다.

// 클라이언트 측에서 데이터 가져오는 과정 (Fetching data on the client side)
// 페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 pre-render할 필요가 없는 경우 클라이언트 측에서 데이터를 가져올 수 있습니다.
// 1. 먼저 데이터가 없는 페이지를 즉시 표시합니다.
// 2. 페이지의 일부는 Static Generation을 사용해 pre-render할 수 있습니다.
// 3. 없는 데이터를 위해 loading 상태를 표시할 수 있습니다.
// 4. 그런 다음 클라이언트 측에서 데이터를 가져와 준비가 되면 표시합니다.

// 이 접근 방식은 예를 들어 사용자 대시보드 페이지에 적합합니다.
// 왜냐하면 대시보드는 사용자별 비공개 페이지이기 때문에 SEO와는 관련이 없으며 페이지를 미리 렌더링할 필요가 없습니다. 또한 데이터는 자주 업데이트되므로 요청 시 데이터를 가져와야 합니다.

export default Home;
