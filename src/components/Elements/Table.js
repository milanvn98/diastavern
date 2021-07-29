import styles from "./Table.module.css";
import Row from "./Row";
import { useState } from "react";

const Table = (props) => {
  const [rows, setRows] = useState(props.data);

  const addHandler = () => {
    props.count('add')
    setRows((prev) => {
      return [...prev, { _id: "", item_name: "", item_description: "", price: 0, vegetarian: false, category: props.category }];
    });
  };

  const saveHandler = (item, newItem) => {
    setRows((prev) => {
      const arr = [...prev];
      const i = arr.find((it) => it["_id"] === item["_id"]);
      Object.assign(i, newItem);
      return [...arr];
    });
  };

  const deleteHandler = (item) => {
    props.count('less')
    setRows((prev) => {
      const arr = prev.filter((itm) => itm["_id"] !== item["_id"]);
      return [...arr];
    });
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>item name</th>
            <th>item description</th>
            <th>price</th>
            <th>v</th>
            <th></th>
          </tr>

          {rows.map((item, index) => {
            return <Row key={index} item={item} save={saveHandler} delete={deleteHandler} />;
          })}
          <tr className={styles["add-row"]}>
            <td className={styles.add} onClick={addHandler}>
              <i className="fas fa-plus-square"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
