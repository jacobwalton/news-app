import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
 const router = useRouter();

  return(
      <div className={styles.main}>
          <div onClick={() => router.push('/')}>Home</div>
          <div onClick={() => router.push('/feed/1')}>Feed</div>
          <div onClick={() => router.push('/covid')}>COVID News</div>
          <div onClick={() => window.open('https://github.com/jawalton6616/news-app', '_blank')}>Github</div>

      </div>
  )
};