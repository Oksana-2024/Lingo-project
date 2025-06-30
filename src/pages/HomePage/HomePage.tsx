import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

import s from "./HomePage.module.css";

const HomePage = () => {
 
  return (
    <section className={s.homePage}>
      <Container className={s.homePageContainer}>
        <div className={s.textBox}>
          <h1 className={s.homeTitle}>
            Unlock your potential with the best
            <span className={s.accentTitle}>language</span>tutors
          </h1>
          <p className={s.homeText}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link to="/teachers" className={s.startButton}>Get started</Link>
        </div>
        <div className={s.imgBox}>
          <img
            className={s.image}
            src="/girl.png"
            alt="Girl"
            srcSet="girl@2x.png"
            width={568}
          />
        </div>
        <ul className={s.boardBox}>
          <li className={s.boardItem}>
            <p className={s.boardText}>32,000 +</p>
            <span className={s.boardSpan}>Experienced tutors</span>
          </li>
          <li className={s.boardItem}>
            <p className={s.boardText}>300,000 +</p>
            <span className={s.boardSpan}>5-star tutor reviews</span>
          </li>
          <li className={s.boardItem}>
            <p className={s.boardText}>120 +</p>
            <span className={s.boardSpan}>Subjects taught</span>
          </li>
          <li className={s.boardItem}>
            <p className={s.boardText}>200 +</p>
            <span className={s.boardSpan}>Tutor nationalities</span>
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default HomePage;
