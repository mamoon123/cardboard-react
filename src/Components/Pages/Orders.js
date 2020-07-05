/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { ACCESS_TOKEN, REACT_APP_API_URL } from '../Constant';
import { OrderCell } from './OrderStyle';



const Orders = () => {
  const [cookies] = useCookies([ACCESS_TOKEN]);
  const token = cookies[ACCESS_TOKEN];
  const [orders, setOrders] = useState([]);

  const confirm = (response) => {
    const { orders } = response;
    console.log(orders);
    setOrders(orders)
  }

  const getLocalDateTime = (created_at) => {
    var testDateUtc = moment.utc(created_at);
    var localDate = moment(testDateUtc).local();
    return localDate.format("YYYY-MM-DD HH:mm");
  }

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/v1/orders`, {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "token "+token
      },
    })
    .then(response => response.json())
    .then(response => {
      confirm(response);
    })
    .catch(err => {
      debugger
      console.log(err);
    });
  }, [token])


  if (!token) {
    window.location.href = '/login';
  }


  return (
    <div>
      <OrderCell className="d-flex flex-row">
        <div className="order_column head">Order #</div>
        <div className="order_column head">Card Type</div>
        <div className="order_column head">Quantity</div>
        <div className="order_column head">Price</div>
        <div className="order_column head">Shipping Fee</div>
        <div className="order_column head">Discount</div>
        <div className="order_column head">Total Price</div>
        <div className="order_column head">Created At</div>
      </OrderCell>
      {orders.map((order, index) => (
        <OrderCell className="d-flex flex-row" key={index}>
          <div className="order_column">{index + 1}</div>
          <div className="order_column">{order.card_type}</div>
          <div className="order_column">{order.quantity}</div>
          <div className="order_column">{order.price}</div>
          <div className="order_column">{order.shipping_fee}</div>
          <div className="order_column">{order.discount}</div>
          <div className="order_column">{order.total_price}</div>
          <div className="order_column">{getLocalDateTime(order.created_at)}</div>
        </OrderCell>
      ))}
    </div>
  );
};
export default Orders;
