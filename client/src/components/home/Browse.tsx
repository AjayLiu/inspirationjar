import QuoteCard from "@components/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import styles from "@styles/Browse.module.css";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";

interface Props {
  quotesList: Array<Quote>;
  votesList?: Array<Vote>;
  isUserQuotes?: boolean;
}

const Browse: React.FC<Props> = (props) => {
  const [quotesList, setQuotesList] = useState(props.quotesList);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setQuotesList(props.quotesList);
  }, [props.quotesList]);

  let options = {
    keys: ["quoteContent"],
    threshold: 0.2,
  };

  const fuse = new Fuse(props.quotesList, options);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value;
    setSearchText(searchVal);
    if (searchVal != "") {
      const filterResult = fuse.search(searchVal);

      const newList = filterResult.map((obj) => {
        return obj.item;
      });
      setQuotesList(newList);
    } else {
      setQuotesList(props.quotesList);
    }
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    const newList = [...quotesList];
    switch (sortOption) {
      case "liked":
        newList.sort((a, b) => (a.voteCount > b.voteCount ? -1 : 1));
        break;
      case "newest":
        newList.sort((a, b) => (a.quoteID > b.quoteID ? 1 : -1));
        break;
      case "oldest":
        newList.sort((a, b) => (a.quoteID > b.quoteID ? -1 : 1));
        break;
    }

    setQuotesList(newList);
  };

  return (
    <div>
      <h2>Browse</h2>
      <div className={styles.filterBar}>
        <div className={styles.sortBar}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort By:
          </label>
          <select
            name="sort"
            className={styles.sortSelect}
            onChange={(e) => onSortChange(e)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="liked">Most Liked</option>
          </select>
        </div>
        <div className={styles.searchBar}>
          <img
            src="img/search.svg"
            alt="search icon"
            className={styles.searchImg}
          />
          <input
            type="text"
            value={searchText}
            placeholder="Search..."
            onChange={(e) => onSearchChange(e)}
          />
        </div>
      </div>

      {quotesList.map((item, idx) => {
        let voted = false;
        if (!props.isUserQuotes) {
          props.votesList.forEach((obj) => {
            if (obj.quoteID == item.quoteID) {
              voted = true;
              return;
            }
          });
        }
        return (
          <QuoteCard
            quote={item}
            key={idx}
            voted={voted}
            isUserQuotes={props.isUserQuotes}
          />
        );
      })}
    </div>
  );
};

export default Browse;
