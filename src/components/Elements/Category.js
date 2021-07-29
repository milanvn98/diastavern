import { useState, useEffect, useContext } from "react";
import styles from "./Category.module.css";
import Table from "./Table";
import useHttp from "../../hooks/useHTTP";
import Button from "./Button";
import DataContext from "../../context/data_context";

const Category = (props) => {
  const data_ctx = useContext(DataContext);
  const item = props.item;
  const [expanded, setExpanded] = useState(true);
  const [category, setCategory] = useState("");
  const [edited, setEdited] = useState(false);
  const [count, setCount] = useState(props.data.length);

  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const saveCatHandler = (e) => {
    e.preventDefault();
    const cat = data_ctx["categories"].find((cat) => cat["name"] === category.toLowerCase());
    if (cat) {
      alert("This category already exists. Please choose a different name.");
    } else {
      sendRequest(
        {
          url: "categories",
          method: "POST",
          body: { _id: item["_id"], name: category.toLowerCase() },
        },
        (response) => {
          props.save(response);
          setEdited(false);
        }
      );
    }
  };

  const deleteHandler = () => {
    props.delete(item);
  };

  const countHandler = (method) => {
    if (method === "add") {
      setCount((prev) => prev + 1);
    }
    if (method === "less") {
      setCount((prev) => prev - 1);
    }
  };

  let expandor;
  expanded ? (expandor = styles.expanded) : (expandor = styles.collapsed);

  return (
    <>
      <div className={styles["category"]}>
        <div className={styles["category-header"]}>
          <div className={styles.count}>
            <p>Total: {count} items</p>
          </div>
          <input
            type="text"
            value={category}
            onChange={(e) => {
              setEdited(true);
              setCategory(e.target.value.toUpperCase());
            }}
          ></input>
          {edited && (
            <Button colour={"var(--gold)"} onClick={saveCatHandler}>
              {isLoading ? <i className={`fa fa-spinner fa-spin fa-fw`}></i> : "SAVE"}
            </Button>
          )}
          {expanded ? (
            <i
              className={`fas fa-chevron-up ${styles.chevron}`}
              onClick={(e) => {
                setExpanded((prev) => !prev);
              }}
            ></i>
          ) : (
            <i
              className={`fas fa-chevron-down ${styles.chevron}`}
              onClick={(e) => {
                setExpanded((prev) => !prev);
              }}
            ></i>
          )}
          {props.deleteIsLoading ? <i className={`fa fa-spinner fa-spin fa-fw ${styles["cat-bin"]}`}></i> : <i className={`fas fa-trash ${styles["cat-bin"]}`} onClick={deleteHandler}></i>}
        </div>
        <div className={`${styles["category-table"]} ${expandor}`}>
          <Table data={props.data} category={props.category.toLowerCase()} count={countHandler} />
        </div>
      </div>
    </>
  );
};

export default Category;
