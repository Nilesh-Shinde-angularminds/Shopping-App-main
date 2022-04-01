import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setlocalStorageData } from "./CartSlice";
import { setCount } from "./HomeSlice";
import NaveBar from "./NaveBar";

export default function Cart() {
  const dispatch = useDispatch();
  const { localStorageData } = useSelector((state) => state.CartData);
  const [data, setData] = useState(); //for state Updata
  const [totalAmount, setTotalAmount] = useState(localStorageData.map((itms) => itms.quntity * itms.price));

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("mainObj"))) {
      dispatch(
        setlocalStorageData(JSON.parse(localStorage.getItem("mainObj")))
      );
    }
    dispatch(setCount(JSON.parse(localStorage.getItem("mainObj")).length));
    amountCalculation();
  }, [data]);

  function counter(count) {
    let data = localStorageData.map((itms, cnt) => {
      if (count == cnt) {
        return { ...itms, quntity: itms.quntity + 1 };
      } else {
        return itms;
      }
    });
    localStorage.setItem("mainObj", JSON.stringify(data));
    setData(data);
  }

  function counterDecrement(count) {
    let data = localStorageData.map((itms, cnt) => {
      if (count == cnt) {
        if (itms.quntity > 1) return { ...itms, quntity: itms.quntity - 1 };
        else {
          return itms;
        }
      } else {
        return itms;
      }
    });
    localStorage.setItem("mainObj", JSON.stringify(data));
    setData(data);
  }

  function RemoveFunction(id) {
    let data = localStorageData.filter((itms, count) => {
      if (itms.id == id) {
      } else {
        return itms;
      }
    });
    setData(data);
    localStorage.setItem("mainObj", JSON.stringify(data));
  }
  function amountCalculation() {
    console.log(localStorageData)
    let data = localStorageData.map((itms) => itms.quntity * itms.price);
    let data2 = data.reduce((pv, cv) => pv + cv, 0);
    localStorage.setItem("TotalAmount", JSON.stringify(data2));
    setTotalAmount(data2);
    console.log(data2)


    let quantitydata = localStorageData.map((itms) => itms.quntity);
    let totalQauntity = quantitydata.reduce((pv, cv) => pv + cv, 0);
    localStorage.setItem("TotalQuantity", JSON.stringify(totalQauntity));
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <NaveBar />
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">MY CART (1)</div>
              {localStorageData.length > 0 ? (
                localStorageData.map((itms, count) => {
                  return (
                    <div key={count} className="panel-body">
                      <form>
                        <div className="row">
                          <div className="col-md-3">
                            {" "}
                            <img
                              src={`http://interviewapi.ngminds.com/${itms.image}`}
                              width="100px"
                              height="200px"
                            />
                          </div>
                          <div className="col-md-3">
                            {itms.name}
                            <br />
                            <i className="fa fa-inr"></i>
                            {itms.price}
                          </div>
                          <div className="col-md-3">
                            {" "}
                            quantity
                            <br />
                            <button
                              type="button"
                              onClick={() => counterDecrement(count)}
                              className="qtyminus"
                              ng-disabled="qty<=0"
                            >
                              -
                            </button>
                            <input
                              ng-model="qty"
                              type="text"
                              name="quantity"
                              className="qty"
                              size="5px"
                              value={itms.quntity}
                              readOnly={true}
                            />
                            <button
                              type="button"
                              onClick={() => counter(count)}
                            >
                              +
                            </button>
                          </div>
                          <div className="col-md-3">
                            {" "}
                            <a
                              onClick={() => RemoveFunction(itms.id)}
                              className="btn btn-warning"
                            >
                              remove
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9">
                            <label
                              onClick={() => amountCalculation()}
                              className="pull-right"
                            >
                              {" "}
                              Amount Payable
                            </label>
                          </div>
                          <div className="col-md-3 ">
                            {itms.quntity * itms.price}
                          </div>
                        </div>
                        <br />
                      </form>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", color: "purple" }}>
                  <h1>
                    {" "}
                    <h3 >&#128532;</h3>
                    Your Cart Has Empty!
                    <br /> Go to Home Page And Add Some Products.
                  </h1>
                </div>
              )}
              <div className="row">
                <div className="col-md-9">
                  <label
                    onClick={() => amountCalculation()}
                    className="pull-right"
                  >
                    {" "}
                    Total Amount Payable
                  </label>
                </div>
                <div className="col-md-3 ">
                  {localStorageData
                    .map((itms) => itms.quntity * itms.price)
                    .reduce((pv, cv) => pv + cv, 0)}
                </div>
              </div>
              <div style={{ overflowY: "auto" }} className="panel-footer">
                <Link to="home" className="btn btn-success">
                  Continue Shopping
                </Link>
                <Link
                  to={
                    localStorageData
                      .map((itms) => itms.quntity * itms.price)
                      .reduce((pv, cv) => pv + cv, 0) > 500 ? "placeorder" :"cart"
                  }
                  className="pull-right btn btn-danger"
                >
                  Place Order
                </Link>
                <br />
                <h6 style={{ float: "right", color: "red", fontSize: "10px" }}>
                  *Order must be grater than 500
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
