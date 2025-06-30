import clsx from "clsx";
import { firestoreDB } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiBookOpen } from "react-icons/bi";
import { FaCircle, FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { RiStarFill } from "react-icons/ri";
import Badges from "../Badges/Badges";
import BaseButton from "../BaseButton/BaseButton";
import BookForm from "../BookForm/BookForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import s from "./TeacherCard.module.css";
import { useAuth } from "../../hook/useAuth";

interface IReviews {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface ITeacherCard {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: IReviews[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
  isIncludes: boolean;
}

const TeacherCard = ({
  id,
  name,
  surname,
  languages,
  levels,
  rating,
  price_per_hour,
  lessons_done,
  avatar_url,
  lesson_info,
  conditions,
  experience,
  reviews,
}: ITeacherCard) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleFavorite = async () => {
    if (!user) {
      toast.info("Please log in to access this feature.");
      return;
    }
    const userRef = doc(firestoreDB, "users/" + user?.uid);

    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        favoriteTeachers: isFavorite ? arrayRemove(id) : arrayUnion(id),
      });
    } else {
      await setDoc(userRef, { favoriteTeachers: [] }, { merge: true });
      await updateDoc(userRef, {
        favoriteTeachers: isFavorite ? arrayRemove(id) : arrayUnion(id),
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    const userRef = doc(firestoreDB, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.data();
      const favorites: string[] = data?.favoriteTeachers || [];
      setIsFavorite(favorites.includes(id));
    });

    return () => unsubscribe();
  }, [user, id]);

  return (
    <div className={s.teacherCard}>
      <div>
        <div className={s.decorImg}>
          <img
            className={s.teacherImg}
            src={avatar_url}
            alt="Teacher's photo"
            width={96}
          />
          <div className={s.online}>
            <FaCircle className={s.iconOnline} size={8} />
          </div>
        </div>
      </div>
      <div className={s.wrapper}>
        <div className={s.headerCard}>
          <p className={s.language}>Languages</p>
          <div className={s.descriptionBox}>
            <div className={s.descr}>
              <span className={s.descrRating}>
                <BiBookOpen size={16} className={s.bookIcon} />
                <p> Lessons online</p>
              </span>
              <span className={s.descrRating}>
                <p> Lessons done: {lessons_done}</p>
              </span>
              <span className={s.descrRating}>
                <RiStarFill size={16} className={s.starIcon} />
                <p> Rating: {rating}</p>
              </span>
              <span className={s.descrRating}>
                <p>
                  Price / 1 hour:
                  <span className={s.price}>{price_per_hour}$</span>
                </p>
              </span>
            </div>
            <button
              type="button"
              className={s.heartBtn}
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FaHeart size={26} className={s.favoriteIcon} />
              ) : (
                <LuHeart size={26} className={s.heartIcon} />
              )}
            </button>
          </div>
        </div>
        <h2 className={s.teacherName}>
          {name} {surname}
        </h2>
        <p className={s.conditions}>
          Speaks:{" "}
          {languages?.map((item, index) => (
            <span className={s.languageStyle} key={index}>
              {item}
              {index < languages.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p className={s.conditions}>
          Lesson Info: <span>{lesson_info}</span>
        </p>
        <p className={clsx(s.conditions, s.last)}>
          Conditions:{" "}
          {conditions?.map((item, index) => (
            <span key={index}>
              {item} {index < conditions.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        {expanded ? (
          <>
            <p className={s.experience}>{experience}</p>
            {reviews?.map((item, index) => (
              <div className={s.reviewsWrapper} key={index}>
                <div className={s.gridWrapper}>
                  <div className={s.avatarReviewer}>
                    {item.reviewer_name
                      .trim()
                      .split(/\s+/)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <p className={s.reviewerName}>{item.reviewer_name}</p>
                  <div className={s.ratingWrapper}>
                    <RiStarFill size={16} className={s.reviewsIcon} />
                    <p className={s.rating}>{item.reviewer_rating}</p>
                  </div>
                </div>
                <p className={s.comment}>{item.comment}</p>
              </div>
            ))}
          </>
        ) : (
          <button
            className={s.readMoreBtn}
            type="button"
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}
        <div className={s.badgesWrapper}>
          {levels?.map((item, index) => (
            <Badges key={index} level={item} />
          ))}
        </div>
        {expanded && (
          <BaseButton
            className={s.bookBtn}
            type="button"
            name="Book trial lesson"
            onClick={() => {
              setIsBookModalOpen(true);
            }}
          />
        )}
      </div>
      <ModalWindow
        closeModal={() => {
          setIsBookModalOpen(false);
        }}
        modalIsOpen={isBookModalOpen}
        className={s.modalScroll}
        title="Book trial lesson"
        description="Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs."
      >
        <div className={s.bookWrapper}>
          <img
            className={s.teacherImg}
            src={avatar_url}
            alt="Teacher's photo"
            width={44}
          />
          <div className={s.column}>
            <p className={s.bookTeacher}>Your teacher</p>
            <p className={s.nameBookTeacher}>
              {name} {surname}
            </p>
          </div>
        </div>
        <BookForm
          onClose={() => {
            setIsBookModalOpen(false);
          }}
        />
      </ModalWindow>
    </div>
  );
};

export default TeacherCard;
