import React from "react";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";

const DataContext = React.createContext();

export const DataContextProvider = (props) => {
  const [food, setFood] = useState([]);
  const [categories, setCategories] = useState([]);

  const { isLoading: categoryIsLoading, sendRequest: getCategory } = useHttp();
  const { isLoading: foodIsLoading, sendRequest: getFood } = useHttp();

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
  }, [getCategory, getFood]);

  const contextValue = {
    food,
    setFood,
    foodIsLoading,
    categories,
    setCategories,
    categoryIsLoading
  };
  return <DataContext.Provider value={contextValue}>{props.children}</DataContext.Provider>;
};

export default DataContext;
