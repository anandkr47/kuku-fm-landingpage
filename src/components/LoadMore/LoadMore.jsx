"use client";

import { fetchData } from "@/app/api/apiService";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Carousel } from "..";
import styles from "./LoadMore.module.css"; // Import the CSS module

const LoadMore = ({ hasMorePages, selectedLanguage }) => {
  const { ref, inView } = useInView({
    threshold: 1.0, // Trigger when 100% of the target is visible
  });
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(hasMorePages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(2); // Start with the next page number

  useEffect(() => {
    if (!hasMore || !inView || loading) return; // Exit if there's no more data or if already loading

    setLoading(true);

    // Fetch more data
    fetchData(selectedLanguage, page)
      .then((res) => {
        if (!res || !res.items) {
          throw new Error("Invalid response structure");
        }

        const newData = res.items.filter(
          (item) => Array.isArray(item.shows) && item.shows.length > 0
        );

        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setHasMore(res.has_more);
          setPage((prevPage) => prevPage + 1); // Increment page number for next fetch
          setError(false);
        } else {
          setHasMore(false); // No more data to fetch
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inView, hasMore, loading, page, selectedLanguage]);

  return (
    <>
      <section>
        <div className={styles.dataContainer}>
          {data?.map((item, index) => (
            <Carousel key={index} slide={item} />
          ))}
        </div>
        <div ref={ref} className={styles.loadingContainer}>
          {loading && !error && (
            <div className={styles.loadingContainer}>
              <span className={styles.loader}></span>
              <h3>Loading...</h3>
            </div>
          )}
          {error && <h3 className={styles.errorMessage}>Failed to load more data</h3>}
        </div>
      </section>
    </>
  );
};

export default LoadMore;
