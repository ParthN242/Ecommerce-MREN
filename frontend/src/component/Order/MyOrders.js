import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction.js";
import Loader from "../Layout/Loader/Loader.js";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const user = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "Order Id", minWIdth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWIdth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColro"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWIdth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWIdth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWIdth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/detail/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading && user.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.user?.name} - Orders `} />
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrderTable"
              autoHeight
            />
            <Typography id="myOrdersHeading">
              {user?.user?.name}'s Orders
            </Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
