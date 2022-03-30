import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NaveBar() {
  const count = useSelector((state) => state.HomeData.count);

  return (
    <>
      <h1>
        <Link to="/">My Ecommerce Site</Link>
        <span className="pull-right">
          <Link to="/cart">Cart ({count})</Link>
        </span>
      </h1>
    </>
  );
}
