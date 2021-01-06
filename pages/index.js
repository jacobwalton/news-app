import { Toolbar } from '../components/toolbar';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <div className='page-container'> 
  
  <Toolbar />

    <div className={styles.main}>
        <h1>News App</h1>

        <h3>Latest news!</h3>
      </div>
   </div>
   );
}
