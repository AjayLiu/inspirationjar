import styles from '@styles/Footer.module.css'
import {imgPath} from 'public/path'
const Footer: React.FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          © 2021 <a href="https://ajayliu.com">Ajay Liu</a>. All Rights Reserved •
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@ajayliu.com"
            > contact@ajayliu.com
          </a>
        </p>
        <div id={styles.socialLinks}>
          <a href="https://github.com/AjayLiu">
            <img src={imgPath+"/github.png"} alt="github logo"/>
          </a>
          <a href="https://www.linkedin.com/in/ajayliu/">
            <img src={imgPath+ "/linkedin.png"} alt="linkedin logo"/>
          </a>
          <a href="https://www.youtube.com/channel/UClr6XCaguPeM0g7UL6Lvs3g">
            <img src={imgPath+"/youtubedark.png"} alt="dark youtube logo"/>
          </a>
        </div>
      </footer>
    </>
  )
}

export default Footer;