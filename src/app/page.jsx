"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "./api/apiService";
import { Carousel, Header, LoadMore, Footer } from "@/components";
import { useLanguage } from './context/languageContext'; // Adjust the path as needed

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const { selectedLanguage } = useLanguage(); // Access the current language

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await fetchData( selectedLanguage); // Pass page number and language
      const filteredData = initialData.items.filter(
        (item) => Array.isArray(item.shows) && item.shows.length > 0
      );
      const banners = initialData.items.find(
        (item) => item.type === "banner"
      ).banners;
      setFilteredItems(filteredData);
      setSlides(banners);
      setHasMore(initialData.has_more || false);
    };
    fetchInitialData();
  }, [selectedLanguage]); // Re-fetch data when the language changes

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <Carousel slide={slides} />
      <section className={styles.main}>
        {filteredItems?.map((item, index) => (
          <Carousel key={index} slide={item} />
        ))}
        <LoadMore hasMorePages={hasMore} selectedLanguage={selectedLanguage} />
      </section>
      <Footer />
    </main>
  );
}
