import { Redirect, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NaveBar from "./NaveBar";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, setDataFromApi, setCount } from "./HomeSlice";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const { dataFromApi, count } = useSelector((state) => state.HomeData);
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.PaginationData
  );
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  let [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("mainObj"))
      ? JSON.parse(localStorage.getItem("mainObj"))
      : []
  );

  useEffect(() => {
    if (selectedData !== null) {
      localData.push(selectedData);
      localStorage.setItem("mainObj", JSON.stringify(localData));
    }
    if (localStorage.getItem("mainObj")) {
      localData = JSON.parse(localStorage.getItem("mainObj"));

      // localData.push(selectedData)
      localStorage.setItem("mainObj", JSON.stringify(localData));
      localStorage.setItem("main2", JSON.stringify(localData));
    }
  }, [selectedData]);

  useEffect(() => {
    if (localStorage.getItem("mainObj")) {
      dispatch(setCount(JSON.parse(localStorage.getItem("mainObj")).length));
    }
  }, [selectedData]);

  const [sort, setSort] = useState("");

  // ****add to cart
  function AddTOCart(id, name, image, price) {
    let count = localData.filter((itm) => itm.id == id);
    let data = JSON.parse(localStorage.getItem("mainObj"));

    if (data) {
      // localData.map((itms)=>{
      //   if(itms.id==id){count++ }})

      if (count.length > 0) {
        let myData = JSON.parse(localStorage.getItem("mainObj"));
        const data = myData.map((itms) =>
          itms.id == id ? { ...itms, quntity: itms.quntity + 1 } : itms
        );
        localStorage.setItem("mainObj", JSON.stringify(data));
        setLocalData(data);
      }
      if (count.length == 0) {
        setSelectedData({
          id: id,
          name: name,
          image: image,
          price: price,
          quntity: 1,
        });
      }
    }

    if (!data) {
      setSelectedData({
        id: id,
        name: name,
        image: image,
        price: price,
        quntity: 1,
      });
    }
  }

  // ****Sorting
  function Sorting(e) {
    e.preventDefault();
    const sort = e.target.value;
    let data = [...dataFromApi];

    if (sort == "H") {
      dispatch(
        setDataFromApi(
          data.sort((a, b) => {
            return b.price - a.price;
          })
        )
      );

      setSort("h");
    }
    if (sort == "L") {
      dispatch(
        setDataFromApi(
          data.sort((a, b) => {
            return a.price - b.price;
          })
        )
      );
      setSort("l");
    }
    if (sort == "D") {
      dispatch(getAllProducts());
    }
  }

  return (
    <>
      <div className="container">
        <NaveBar />
        <hr />

        <div className="row">
          <div className="col-sm-12">
            <div style={{ margin: "margin: 25px 0" }}>
              <label className="control-label">Sort by:</label>
              <select
                onChange={(e) => {
                  Sorting(e);
                }}
                name=""
                id=""
              >
                <option value="D">Default</option>
                <option value="H">High to Low</option>
                <option value="L">Low to High</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="row"> */}
        {Array.from(
          {
            length: Math.ceil(
              dataFromApi.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              ).length / 4
            ),
          },
          (_, index) => index
        ).map((productNo, i2) => {
          return (
            <div key={i2}>
              <div className="row">
                {dataFromApi
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((itms, i) => {
                    if (productNo * 4 <= i && i < productNo * 4 + 4) {
                      return (
                        <div key={i} className="col-md-3">
                          <div
                            className={
                              i % 4 === 0
                                ? "bg-info"
                                : i % 4 === 1
                                ? "bg-warning"
                                : i % 4 === 2
                                ? "bg-danger"
                                : "bg-success"
                            }
                          >
                            <img
                              src={`http://interviewapi.ngminds.com/${itms.image}`}
                              width="100"
                              height="200"
                            />
                            <br />
                            <p>{itms.name}</p>
                            <p>
                              <i className="fa fa-inr"></i>
                              {itms.price}
                            </p>

                            <a
                              onClick={() =>
                                AddTOCart(
                                  itms._id,
                                  itms.name,
                                  itms.image,
                                  itms.price
                                )
                              }
                              className="btn btn-warning"
                            >
                              Add to Cart
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <hr />
            </div>
          );
        })}
        <Pagination />
      </div>
    </>
  );
}
