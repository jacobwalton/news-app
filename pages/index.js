import { Toolbar } from '../components/toolbar';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <div className='page-container'> 
  
  <Toolbar />

    <div className={styles.main}>
      
        <h1 className={styles.header}>News App</h1>

        <h5 className={styles.subtitle}>Check out the latest stories from around the country and keep up with all the latest COVID numbers and news!</h5>
      </div>
   </div>
   );
}
