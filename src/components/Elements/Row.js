import { useState } from "react";
import useValidate from "../../hooks/useValidate";
import Button from "./Button";
import useHttp from "../../hooks/useHTTP";

const Row = (props) => {
  const item = props.item;

  const [vegetarian, setVegetarian] = useState(item["vegetarian"]);
  const { isLoading: saveIsLoading, sendRequest: saveSend } = useHttp();
  const { isLoading: deleteIsLoading, sendRequest: deleteSend } = useHttp();

  const [edited, setEdited] = useState(false);

  const vegetarianHandler = () => {
    setEdited(true)
    setVegetarian((prev) => !prev);
  };

  const { value: itemName, valueChangeHandler: itemNameChangeHandler, inputBlurHandler: itemNameBlurHandler, valueClass: itemNameClass } = useValidate((value) => value.trim() !== "", item["item_name"]);
  const { value: itemDescription, valueChangeHandler: itemDescriptionChangeHandler, inputBlurHandler: itemDescriptionBlurHandler, valueClass: itemDescriptionClass } = useValidate((value) => value.trim() !== "", item["item_description"]);
  const { value: price, valueChangeHandler: priceChangeHandler, inputBlurHandler: priceBlurHandler, valueClass: priceClass } = useValidate((value) => value >= 0, item["price"]);

  const saveHandler = () => {
    saveSend(
      {
        url: "food",
        method: "POST",
        body: { _id: item["_id"], item_name: itemName, item_description: itemDescription, price, vegetarian: vegetarian, category: item["category"] },
      },
      (response) => {
        props.save(item, { _id: response["_id"], item_name: itemName, item_description: itemDescription, price, vegetarian });
      }
    );
    setEdited(false);
  };

  const deleteHandler = () => {
    //Send Request
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
        <td>{item["_id"]}</td>
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
        <td>
          <input
            type="number"
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
        <td onClick={vegetarianHandler}>{vegetarian && <i className="fas fa-seedling"></i>}</td>
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
