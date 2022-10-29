import searchImg from "./../../assets/search.png";
import { useState } from "react";

//css
import classes from "./Search.module.css";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    props.onSearch(search);
  };

  return (
    <div className={classes.search}>
      <form onSubmit={handleSearch}>
        <div className={classes.search__cover}>
          <img src={searchImg} alt="search" title="search" className="img" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={search}
            className={classes.input}
            onChange={handleSearch}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
