import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import TeacherCard, {
  type ITeacherCard,
} from "../../components/TeacherCard/TeacherCard";
import { db } from "../../firebase";
import {
  onValue,
  ref,
  query,
  limitToFirst,
  orderByKey,
  startAfter,
} from "firebase/database";
import BaseButton from "../../components/BaseButton/BaseButton";
import s from "./TeacherPage.module.css";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState<ITeacherCard[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 4;

  const fetchTeachers = (startKey: string | null = null) => {
    let teachersQuery;

    if (startKey) {
      setIsLoadingMore(true);
      teachersQuery = query(
        ref(db, "teachers"),
        orderByKey(),
        startAfter(startKey),
        limitToFirst(pageSize)
      );
    } else {
      setIsLoading(true);
      teachersQuery = query(
        ref(db, "teachers"),
        orderByKey(),
        limitToFirst(pageSize)
      );
    }
    onValue(
      teachersQuery,
      (snapshot) => {
        const data = snapshot.val() as ITeacherCard[];
        if (data) {
          const array = Object.values(data);
          setTeachers((prev) => [...prev, ...array]);
          setLastKey((teachers.length + array.length - 1).toString());
          setHasMore(array.length >= pageSize);
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
        setIsLoadingMore(false);
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <section className={s.teacherPage}>
      <Container>
        {isLoading ? (
          <div className={s.loading}>Loading...</div>
        ) : (
          <ul className={s.teacherList}>
            {teachers.map((item, index) => (
              <li key={index} className={s.teacherItem}>
                <TeacherCard {...item} isIncludes={true} />
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !isLoadingMore && hasMore && (
          <BaseButton
            name="Load more"
            onClick={() => fetchTeachers(lastKey)}
            type="button"
            className={s.loadMoreBtn}
          />
        )}
        {isLoadingMore && <div>Loading...</div>}
      </Container>
    </section>
  );
};

export default TeacherPage;
