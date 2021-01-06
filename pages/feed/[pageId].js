import Head from 'next/head';
import { useRouter } from "next/router";
import {Toolbar} from '../../components/toolbar'
import styles from "../../styles/Feed.module.css";
export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <>
    <Head>
    <meta property="og:image" content={articles[0]?.urlToImage} />
    <meta property="og:description" content={articles[0]?.description} />
    <meta property="og:title" content={articles[0]?.title + ' and more!'} />
  </Head>
    <div className="page-container">
        <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => window.open(article.url, "_blank")}>
              {article.title}
            </h1>
            <p className={styles.description}>{article.description}</p>
            {!!article.urlToImage && (
              <img
                src={article.urlToImage}
                onClick={() => window.open(article.url, "_blank")}
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`./${pageNumber - 1}`).then(()=> window.scrollTo(0,0));
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <div>Page {pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`./${pageNumber + 1}`).then(()=> window.scrollTo(0,0));
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.pageId;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const apiJSON = await apiResponse.json();

  const { articles } = apiJSON;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };

  //   .then(res => res.json());

  //   const { articles } = apiResponse;
};
export default Feed;
