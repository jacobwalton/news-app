import styles from "../styles/COVID.module.css";
import Head from 'next/head';
import numeral from "numeral";
import { Toolbar } from "../components/toolbar";

export const COVID = ({ covidStats, articles }) => {
  console.log(covidStats);
  return (
    <div>
    <Toolbar />
    <div className={styles.container}>
      
      <div className={styles.containerLeft}>
        <div className={styles.content}>
          <h1 className={styles.header}>Covid Updates</h1>
          <div className={styles.cases}>
            <h2>Total Cases:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.cases).format("0.0a")}
            </h3>
            <h2>Today's Cases:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.todayCases).format("0.0a")}
            </h3>
            <hr />
          </div>
          <div className={styles.deaths}>
            <h2>Total Deaths:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.deaths).format("0.0a")}
            </h3>
            <h2>Deaths Today:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.todayDeaths).format("0.0a")}
            </h3>
            <hr />
          </div>
          <div className={styles.recovered}>
            <h2>Total Recovered:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.recovered).format("0.0a")}
            </h3>
            <h2>Recovered Today:</h2>
            <h3 className={styles.stats}>
              {numeral(covidStats.todayRecovered).format("0.0a")}
            </h3>
            <hr />
          </div>
          <div className={styles.additional}>
            <h3>Additional Info:</h3>
            <strong>Cases per Million: </strong>
            {numeral(covidStats.casesPerOneMillion).format("0.0a")}
            <br />
            <strong>Deaths per Million: </strong>
            {numeral(covidStats.deathsPerOneMillion).format("0.0a")}
            <br />
            <strong>Tests per Million: </strong>
            {numeral(covidStats.testsPerOneMillion).format("0.0a")}
            <br />
          </div>
        </div>
      </div>
      <div className={styles.containerRight}>
        <h1 className={styles.header}>Covid Stories</h1>
        <strong>Latest Covid Stories: </strong>
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
      </div>
    </div>
    </div>
  );
};

export async function getServerSideProps() {
  const statsRes = await fetch("https://disease.sh/v3/covid-19/all");
  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&q=covid&pageSize=5`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const apiJSON = await apiResponse.json();

  const { articles } = apiJSON;

  const covidStats = await statsRes.json();
  // const covidStories = await storiesRes.json();

  return {
    props: {
      covidStats,
      articles,
    },
  };
};

export default COVID;
