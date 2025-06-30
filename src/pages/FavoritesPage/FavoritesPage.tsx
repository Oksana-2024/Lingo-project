import { useEffect, useState } from "react";
import { db, firestoreDB } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import type { ITeacherCard } from "../../components/TeacherCard/TeacherCard";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Container from "../../components/Container/Container";
import s from "./Favorites.module.css";
import { useAuth } from "../../hook/useAuth";

const FavoritesPage = () => {
  const [isLoading, setIsloading] = useState(true);
  const [favoriteTeachers, setFavoriteTeachers] = useState<ITeacherCard[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const userRef = doc(firestoreDB, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, async (snapshot) => {
      const data = snapshot.data();
      const favorites: string[] = data?.favoriteTeachers || [];

      if (favorites.length < 1) {
        setFavoriteTeachers([]);
        setIsloading(false);
        return;
      }

      const fetchedTeachers: ITeacherCard[] = [];

      for (const id of favorites) {
        const teacherQuery = query(
          ref(db, "teachers"),
          orderByChild("id"),
          equalTo(id)
        );

        const snapshot = await get(teacherQuery);

        snapshot.forEach((childSnap) => {
          const teacherData = childSnap.val();
          fetchedTeachers.push(teacherData);
        });
      }

      setFavoriteTeachers(fetchedTeachers);
      setIsloading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <section className={s.favoritePage}>
      <Container className={s.favorite}>
        {isLoading && <p className={s.loading}>Loading...</p>}
        {!isLoading && favoriteTeachers.length < 1 && (
          <p className={s.favoriteText}>
            Mark teachers with a heart to save them in this section for
            convenient access.
          </p>
        )}
        {!isLoading && favoriteTeachers.length > 0 && (
          <ul className={s.teacherList}>
            {favoriteTeachers.map((item, index) => (
              <li key={index} className={s.teacherItem}>
                <TeacherCard {...item} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;
