import "./App.css";
import Admin from "./components/Layout/Admin";
import { Switch, Route, Redirect } from "react-router-dom";
import Portal from "./components/Authentication/Portal";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
require("dotenv").config();

function App() {
  const auth_context = useContext(AuthContext);
  const isLoggedIn = auth_context.isLoggedIn;
  return (
    <>
      <Switch>
        <Route path={"/"} exact>
        <Redirect to={"/food"} />
        </Route>
        <Route path={"/food"} exact>
          {isLoggedIn ? <Admin path={"food"} /> : <Redirect to={"/login"} />}
        </Route>
        <Route path={"/drinks"} exact>
          {isLoggedIn ? <Admin path={"drinks"} /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/login" exact>
          <Portal method={"login"}></Portal>
        </Route>
        <Route path="/signup" exact>
          <Portal method={"signup"}></Portal>
        </Route>
      </Switch>
    </>
  );
}

export default App;
