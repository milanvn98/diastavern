import styles from "./Table.module.css";
import Row from "./Row";
import { useState, useContext } from "react";
import NavContext from "../../context/nav-context";

const Table = (props) => {
  const nav_ctx = useContext(NavContext)
  const [rows, setRows] = useState(props.data.sort((a, b) => (a.order > b.order ? 1 : -1)));

  const addHandler = () => {
    props.count('add')
    if(nav_ctx.page === 'food'){
      setRows((prev) => {
        return [...prev, { _id: "", item_name: "", item_description: "", price: 0, vegetarian: false, category: props.category }];
      });
    } else {
      setRows((prev) => {
        return [...prev, { _id: "", order: "", item_name: "", glass_price: '', bottle_price: '', type: props.category }];
      });
    }
  
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
            <th>order</th>
            <th>item name</th>
            {nav_ctx.page === 'drinks' && <th>gl. price</th>}
            {nav_ctx.page === 'drinks' && <th>btl. price</th>}
            {nav_ctx.page === 'food' && <th>item description</th>}
            {nav_ctx.page === 'food' && <th>price</th>}
            {nav_ctx.page === 'food' && <th>v</th>}
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
