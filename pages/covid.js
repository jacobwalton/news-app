import styles from "../styles/COVID.module.css";
import numeral from "numeral";

export const COVID = ({ covidStats, covidStories }) => {
  console.log(covidStats);
  return (
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
        <h1 className={styles.header}>Covid Resources/Stories</h1>
        <strong>Latest Covid Story: </strong>
        {/* {covidStories.totalResults} */}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const statsRes = await fetch("https://disease.sh/v3/covid-19/all");
  const storiesRes = await fetch(
"https://newsapi.org/v2/top-headlines?q=covid&country=us&apiKey=77c81c6b62ac4734be89f776f6b1264b"  );

  const covidStats = await statsRes.json();
  const covidStories = await storiesRes.json();

  return {
    props: {
      covidStats,
      covidStories
    },
  };
};

export default COVID;
