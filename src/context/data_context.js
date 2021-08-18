import React from "react";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";

const DataContext = React.createContext();

export const DataContextProvider = (props) => {
  const [food, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [types, setTypes] = useState([]);

  const { isLoading: categoryIsLoading, sendRequest: getCategory } = useHttp();
  const { isLoading: foodIsLoading, sendRequest: getFood } = useHttp();
  const { isLoading: typeIsLoading, sendRequest: getType } = useHttp();
  const { isLoading: drinkIsLoading, sendRequest: getDrink } = useHttp();

  useEffect(() => {
    getCategory(
      {
        url: "categories",
        method: "GET",
      },
      (response) => {
        setCategories(response);
      }
    );

    getFood(
      {
        url: "food",
        method: "GET",
      },
      (response) => {
        setFood(response);
      }
    );

    getType(
      {
        url: "types",
        method: "GET",
      },
      (response) => {
        setTypes(response);
      }
    );

    getDrink(
      {
        url: "drinks",
        method: "GET",
      },
      (response) => {
        setDrinks(response);
      }
    );
  }, [getCategory, getFood, getType, getDrink]);

  const contextValue = {
    food,
    setFood,
    foodIsLoading,
    categories,
    setCategories,
    categoryIsLoading,
    drinks,
    drinkIsLoading,
    setDrinks,
    types,
    setTypes,
    typeIsLoading
  };
  return <DataContext.Provider value={contextValue}>{props.children}</DataContext.Provider>;
};

export default DataContext;
