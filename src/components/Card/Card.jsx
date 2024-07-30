import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";

const Card = ({ item }) => {
  return (
    <div className={styles.item}>
      {item ? (
        <>
          <Image
            src={item.image}
            alt={item.title}
            className={styles.image}
            height={150}
            width={150}
          />
          <div className={styles.card_details}>
            <p className={styles.title}>{item.title}</p>
            <a
              className={styles.play_button}
              href={`/show/${item.item_id}?play=true`}
            >
              <Image
                className={styles.play_icon}
                src="https://d1l07mcd18xic4.cloudfront.net/static/play-outline.svg"
                alt="Play"
                width={10}
                height={10}
              />
            </a>
          </div>
        </>
      ) : (
        <>
          <i>No Items Found</i>
        </>
      )}
    </div>
  );
};

export default Card;
