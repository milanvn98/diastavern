import { useState, useContext } from "react";
import useValidate from "../../hooks/useValidate";
import Button from "./Button";
import useHttp from "../../hooks/useHTTP";
import NavContext from "../../context/nav-context";

const Row = (props) => {
  const item = props.item;
  const nav_ctx = useContext(NavContext);

  const [vegetarian, setVegetarian] = useState(item["vegetarian"]);
  const { isLoading: saveIsLoading, sendRequest: saveSend } = useHttp();
  const { isLoading: deleteIsLoading, sendRequest: deleteSend } = useHttp();

  const [edited, setEdited] = useState(false);

  const vegetarianHandler = () => {
    setEdited(true);
    setVegetarian((prev) => !prev);
  };

  const { value: itemName, valueChangeHandler: itemNameChangeHandler, inputBlurHandler: itemNameBlurHandler, valueClass: itemNameClass } = useValidate((value) => value.trim() !== "", item["item_name"]);
  const { value: itemDescription, valueChangeHandler: itemDescriptionChangeHandler, inputBlurHandler: itemDescriptionBlurHandler, valueClass: itemDescriptionClass } = useValidate((value) => value.trim() !== "", item["item_description"]);
  const { value: price, valueChangeHandler: priceChangeHandler, inputBlurHandler: priceBlurHandler, valueClass: priceClass } = useValidate((value) => value >= 0, item["price"]);
  const { value: btlPrice, valueChangeHandler: btlPriceChangeHandler, inputBlurHandler: btlPriceBlurHandler, valueClass: btlPriceClass } = useValidate((value) => value >= 0, item["bottle_price"]);
  const { value: glPrice, valueChangeHandler: glPriceChangeHandler, inputBlurHandler: glPriceBlurHandler, valueClass: glPriceClass } = useValidate((value) => value >= 0, item["glass_price"]);
  const { value: order, valueChangeHandler: orderChangeHandler, inputBlurHandler: orderBlurHandler, valueClass: orderClass } = useValidate((value) => value >= 0, item["order"]);

  const saveHandler = () => {
    let url = "food";
    let data = { _id: item["_id"], order, item_name: itemName, item_description: itemDescription, price, vegetarian: vegetarian, category: item["category"] };
    if (nav_ctx.page === "drinks") {
      url = "drinks";
      data = {
        _id: item["_id"],
        order,
        item_name: itemName,
        bottle_price: btlPrice,
        glass_price: glPrice,
        type: item["type"],
      };
    }
    saveSend(
      {
        url,
        method: "POST",
        body: data,
      },
      (response) => {
        if (nav_ctx.page === "drinks") {
          props.save(item, { _id: response["_id"], order, item_name: itemName, bottle_price: btlPrice, glass_price: glPrice });
        } else {
          props.save(item, { _id: response["_id"], order, item_name: itemName, item_description: itemDescription, price, vegetarian });
        }
      }
    );
    setEdited(false);
  };

  const deleteHandler = () => {
    deleteSend(
      {
        url: "food",
        method: "DELETE",
        body: { _id: item["_id"] },
      },
      (response) => {}
    );
    props.delete(item);
  };
  return (
    <>
      <tr key={item["_id"]}>
        <td>
          <input
            type="number"
            onWheel={(e) => e.target.blur()}
            value={order}
            onChange={(e) => {
              setEdited(true);
              orderChangeHandler(e.target.value);
            }}
            onBlur={orderBlurHandler}
            className={orderClass}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={itemName}
            onChange={(e) => {
              setEdited(true);
              itemNameChangeHandler(e.target.value);
            }}
            onBlur={itemNameBlurHandler}
            className={itemNameClass}
          ></input>
        </td>
        {nav_ctx.page === "food" && (
          <td>
            <input
              type="text"
              value={itemDescription}
              onChange={(e) => {
                setEdited(true);
                itemDescriptionChangeHandler(e.target.value);
              }}
              onBlur={itemDescriptionBlurHandler}
              className={itemDescriptionClass}
            ></input>
          </td>
        )}
        {nav_ctx.page === "drinks" && (
          <td>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              value={glPrice}
              onChange={(e) => {
                setEdited(true);
                glPriceChangeHandler(e.target.value);
              }}
              onBlur={glPriceBlurHandler}
              className={glPriceClass}
            ></input>
          </td>
        )}
        {nav_ctx.page === "drinks" && (
          <td>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              value={btlPrice}
              onChange={(e) => {
                setEdited(true);
                btlPriceChangeHandler(e.target.value);
              }}
              onBlur={btlPriceBlurHandler}
              className={btlPriceClass}
            ></input>
          </td>
        )}
        {nav_ctx.page === "food" && (
          <td>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              value={price}
              onChange={(e) => {
                setEdited(true);
                priceChangeHandler(e.target.value);
              }}
              onBlur={priceBlurHandler}
              className={priceClass}
            ></input>
          </td>
        )}
        {nav_ctx.page === "food" && <td onClick={vegetarianHandler}>{vegetarian && <i className="fas fa-seedling"></i>}</td>}
        <td>
          {edited ? (
            <Button colour={"var(--gold"} onClick={saveHandler}>
              {saveIsLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SAVE"}
            </Button>
          ) : deleteIsLoading ? (
            <i className="fa fa-spinner fa-spin fa-fw"></i>
          ) : (
            <i className="fas fa-trash" onClick={deleteHandler}></i>
          )}
        </td>
      </tr>
    </>
  );
};

export default Row;
