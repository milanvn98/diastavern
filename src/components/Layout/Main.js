import { useContext, useState, useEffect } from "react";
import DataContext from "../../context/data_context";
import Button from "../Elements/Button";
import Category from "../Elements/Category";
import styles from "./Main.module.css";
import useHttp from "../../hooks/useHTTP";

const Main = (props) => {
  const data_ctx = useContext(DataContext);
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);

  const { isLoading: createIsLoading, sendRequest: createCat } = useHttp();
  const { isLoading: deleteIsLoading, sendRequest: deleteCat } = useHttp();

  useEffect(() => {
    setCategories(data_ctx["categories"]);
    setFood(data_ctx["food"]);
  }, [data_ctx]);

  const categoryHandler = () => {
    createCat(
      {
        url: "categories",
        method: "POST",
        body: { name: "#CATEGORY_NAME" },
      },
      (response) => {
        setCategories((prev) => {
          return [...prev, { _id: response["_id"], name: response["name"] }];
        });
      }
    );
  };

  const saveCategoryHandler = (response) => {
    setCategories((prev) => {
      const arr = [...prev];
      const i = arr.find((cat) => cat["_id"] === response["_id"]);
      i["name"] = response["name"];
      return [...arr];
    });
  };

  const deleteHandler = (item) => {
    deleteCat(
      {
        url: "categories",
        method: "DELETE",
        body: { _id: item["_id"], name: item["name"] },
      },
      (response) => {
        setCategories((prev) => {
          const arr = prev.filter((it) => it["_id"] !== item["_id"]);
          return [...arr];
        });
      }
    );
  };

  return (
    <>
      {!data_ctx["foodIsLoading"] && !data_ctx["categoryIsLoading"] && (
        <div className={styles["outer-wrapper"]}>
          {categories.map((category, index) => {
            const foods = food.filter((item) => item["category"] === category["name"]);
            return <Category key={index} category={category["name"].toUpperCase()} data={foods} item={category} delete={deleteHandler} deleteIsLoading={deleteIsLoading} save={saveCategoryHandler} />;
          })}
          <div className={styles["button-container"]}>
            <Button colour={"var(--red)"} onClick={categoryHandler}>
              {createIsLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "ADD A CATEGORY"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
