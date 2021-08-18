import Navigation from "../Navigation/Navigation";
import Main from "./Main";
import { useContext, useEffect } from "react";
import NavContext from "../../context/nav-context";

const Admin = (props) => {
  const nav_ctx = useContext(NavContext);

  useEffect(() => {
    nav_ctx.setPage(props.path);
  }, [nav_ctx, props]);

  return (
    <>
      <Navigation />
      <Main />
    </>
  );
};

export default Admin;
