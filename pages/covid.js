import styles from "../styles/COVID.module.css";
import numeral from "numeral";

export const COVID = ({ covidStats }) => {
  console.log(covidStats);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>Covid Updates</h1>
        <div className={styles.cases}>
          <h2>Total Cases</h2><h3 className={styles.stats}>{covidStats.cases}</h3>
          <h2>Today's Cases</h2><h3 className={styles.stats}>{covidStats.todayCases}</h3>
        </div>
        <div className={styles.deaths}>
          <h2>Total Deaths</h2><h3 className={styles.stats}>{covidStats.deaths}</h3>
          <h2>Deaths Today</h2><h3 className={styles.stats}>{covidStats.todayDeaths}</h3>
        </div>
        <div className={styles.recovered}>
          <h2>Total Recovered</h2><h3 className={styles.stats}>{covidStats.recovered}</h3>
          <h2>Recovered Today</h2><h3 className={styles.stats}>{covidStats.todayRecovered}</h3>
        </div>
        <div className={styles.additional}>
          <h4>Additional Info:</h4>
          Cases per Million: {covidStats.casesPerOneMillion}<br />
          Deaths per Million: {covidStats.deathsPerOneMillion}<br />
          Tests per Million: {covidStats.testsPerOneMillion}<br />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch("https://disease.sh/v3/covid-19/all");

  const covidStats = await apiResponse.json();

  return {
    props: {
      covidStats: covidStats,
    },
  };
};

export default COVID;
