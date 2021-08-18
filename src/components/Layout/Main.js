import { useContext, useState, useEffect } from "react";
import DataContext from "../../context/data_context";
import Button from "../Elements/Button";
import Category from "../Elements/Category";
import styles from "./Main.module.css";
import useHttp from "../../hooks/useHTTP";
import NavContext from "../../context/nav-context";
import { Link } from 'react-router-dom';



const Main = (props) => {
  const data_ctx = useContext(DataContext);
  const nav_ctx = useContext(NavContext);

  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState([]);

  const [types, setTypes] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const { isLoading: createIsLoading, sendRequest: createSend } = useHttp();
  const { isLoading: deleteIsLoading, sendRequest: deleteSend } = useHttp();

  useEffect(() => {
    setCategories(data_ctx["categories"]);
    setFood(data_ctx["food"]);
    setTypes(data_ctx["types"]);
    setDrinks(data_ctx["drinks"]);
  }, [data_ctx]);

  const createHandler = () => {
    let url = "categories";
    if (nav_ctx.page === "drinks") {
      url = "types";
    }

    createSend(
      {
        url,
        method: "POST",
        body: { name: "#CATEGORY_NAME" },
      },
      (response) => {
        if (nav_ctx.page === "food") {
          setCategories((prev) => {
            return [...prev, { _id: response["_id"], name: response["name"] }];
          });
        } else {
          setTypes((prev) => {
            return [...prev, { _id: response["_id"], name: response["name"] }];
          });
        }
      }
    );
  };

  const saveHandler = (response) => {
    if (nav_ctx.page === "food") {
      setCategories((prev) => {
        const arr = [...prev];
        const i = arr.find((cat) => cat["_id"] === response["_id"]);
        i["name"] = response["name"];
        return [...arr];
      });
    } else {
      setTypes((prev) => {
        const arr = [...prev];
        const i = arr.find((typ) => typ["_id"] === response["_id"]);
        i["name"] = response["name"];
        return [...arr];
      });
    }
  };

  const deleteHandler = (item) => {
    let url = "categories";
    if (nav_ctx.page === "drinks") {
      url = "types";
    }

    deleteSend(
      {
        url,
        method: "DELETE",
        body: { _id: item["_id"], name: item["name"] },
      },
      (response) => {
        if (nav_ctx.page === "food") {
          setCategories((prev) => {
            const arr = prev.filter((it) => it["_id"] !== item["_id"]);
            return [...arr];
          });
        } else {
          setTypes((prev) => {
            const arr = prev.filter((it) => it["_id"] !== item["_id"]);
            return [...arr];
          });
        }
      }
    );
  };

  return (
    <>
      {!data_ctx["foodIsLoading"] && !data_ctx["categoryIsLoading"] && !data_ctx["typeIsLoading"] && !data_ctx["drinkIsLoading"] && (
        <div className={styles["outer-wrapper"]}>
        <div className={styles.nav}><Link to={'/food'}><Button colour={'var(--gold)'}><h2>FOOD</h2></Button></Link><Link to={'/drinks'}><Button colour={'var(--gold)'}><h2>DRINKS</h2></Button></Link></div>
          {nav_ctx.page === 'food' && categories.map((category, index) => {
            const foods = food.filter((item) => item["category"] === category["name"]);
            return <Category key={index} category={category["name"].toUpperCase()} data={foods} item={category} delete={deleteHandler} deleteIsLoading={deleteIsLoading} save={saveHandler} />;
          })}
          {nav_ctx.page === 'drinks' && types.map((type, index) => {
            const drnk = drinks.filter((item) => item["type"] === type["name"]);
            return <Category key={index} category={type["name"].toUpperCase()} data={drnk} item={type} delete={deleteHandler} deleteIsLoading={deleteIsLoading} save={saveHandler} />;
          })}
          <div className={styles["button-container"]}>
            <Button colour={"var(--red)"} onClick={createHandler}>
              {createIsLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "ADD A CATEGORY"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
