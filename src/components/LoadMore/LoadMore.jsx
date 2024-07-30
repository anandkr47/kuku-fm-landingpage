"use client";

import { fetchData } from "@/app/api/apiService";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Carousel } from "..";

let page = 2;

const LoadMore = ({ hasMorePages }) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(hasMorePages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!hasMore || !inView || loading) return;

    setLoading(true);
    fetchData(2)
      .then((res) => {
        const newData = res.items.filter(
          (item) => Array.isArray(item.shows) && item.shows.length > 0
        );
        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setHasMore(res.has_more);
          page++;
          setError(false);
        } else {
          setHasMore(false);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inView, hasMore, loading]);

  return (
    <>
      <section>
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {data?.map((item, index) => (
            <Carousel key={index} slide={item} />
          ))}
        </div>
        <div ref={ref} className="loading-container">
          {loading && !error && (
            <div
              style={{
                margin: "1rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="loader"></span>
              <h3>Loading...</h3>
            </div>
          )}
          {error && <h3>Failed to load more data</h3>}
        </div>
      </section>
    </>
  );
};

export default LoadMore;
