import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Store from "./App/Store";
import {
  BrowserRouter,
  Route,
  Router,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import PlaceOrder from "./Components/PlaceOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import NaveBar from "./Components/NaveBar";
// npm i react-router-dom@5.3.0

function App() {
  return (
    <Provider store={Store}>
      {/* <NaveBar /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
          <Route path="/placeorder">
            <PlaceOrder />
          </Route>
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
