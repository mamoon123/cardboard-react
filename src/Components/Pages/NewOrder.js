/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, USER, REACT_APP_API_URL } from '../Constant';
import { CustomInput, NewOrderCell, SubTotal, OrderPlace } from './OrderStyle';
import { CustomeSpinner } from '../Auth/AuthStyle';

const HIGH_QUALITY = 20;
const PREMIUM      = 30;


const NewOrder = () => {
  const [cookies] = useCookies([ACCESS_TOKEN]);
  const token = cookies[ACCESS_TOKEN];
  const user = cookies[USER]
  const [loading, setLoading] = useState(false);
  const [cardBoards, setCardBoards] = useState([]);
  const [quantityPremium, setQuantityPremium] = useState(0);
  const [quantityHigh, setQuantityHigh] = useState(0);
  const [highTotalPrice, setHighTotalPrice] = useState(0);
  const [premiumTotalPrice, setPremiumTotalPrice] = useState(0);

  useEffect(() => {
    setPremiumTotalPrice(quantityPremium * PREMIUM);
  }, [quantityPremium])

  useEffect(() => {
    setHighTotalPrice(quantityHigh * HIGH_QUALITY)
  }, [quantityHigh])


  const confirm = (response) => {
    const { cardboard_type } = response;
    console.log(cardboard_type);
    setCardBoards(cardboard_type)
  }

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/v1/cardboard_types`, {
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
  }, [token]);

  const onInputChangeHigh= (evt) => {
    setQuantityHigh(parseInt(evt.target.value, 10));
  }

  const onInputChangePremium= (evt) => {
    setQuantityPremium(parseInt(evt.target.value, 10));
  }

  const totalQuantity = ()  => {
    return quantityHigh + quantityPremium;
  }

  const totalPrice = ()  => {
    return highTotalPrice + premiumTotalPrice;
  }

  const getCardTypes = () => {
    let emptyCard = '';
    if (quantityHigh > 0) {
      emptyCard = emptyCard + 'High Quality'
    }
    if (quantityPremium > 0) {
      emptyCard = emptyCard + ', Premium'
    } 
    return emptyCard;
  }

  const availableBalance = () => {
    let newBalance = 0;
    if (totalQuantity() <= 10 && totalQuantity() > 0) {
      newBalance = totalPrice() + 30;
    }
    if (totalQuantity() <= 20 && totalQuantity() > 10) {
      newBalance = totalPrice();
    }
    if (totalQuantity() > 20) {
      newBalance = totalPrice() * 0.9;
    }
    return newBalance;
  }

  const getDiscount = () => {
    let discountValue = 0;
    if ((totalPrice() - availableBalance()) > 0 ) {
      discountValue = totalPrice() - availableBalance();
    }
    return discountValue;
  }

  const handlePlaceOrder = () => {
    const params = {
      quantity: totalQuantity(),
      price: totalPrice(),
      user_id: user.id,
      shipping_fee: totalQuantity() < 10 ? 30 : 0,
      discount: getDiscount(),
      card_type: getCardTypes(),
      total_price: availableBalance(),
    }
    setLoading(true)
    fetch(`${REACT_APP_API_URL}/api/v1/orders`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": "token "+token
      },
      "body": JSON.stringify(params)
    })
    .then(response => response.json())
    .then(response => {
      const { status } = response
      if (status === 200) {
        window.location.href = '/orders';
      } else {
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err);
    });
  }


  if (!token) {
    window.location.href = '/login';
  }


  return (
    <div>
      <NewOrderCell className="d-flex flex-row">
        <div className="order_column head">CardBoard #</div>
        <div className="order_column head">Card Type</div>
        <div className="order_column head">Price</div>
        <div className="order_column head">Qty</div>
        <div className="order_column head">Total</div>
      </NewOrderCell>
      {cardBoards.map((card, index) => (
        <NewOrderCell className="d-flex flex-row" key={index}>
          <div className="order_column">{index + 1}</div>
          <div className="order_column">{card.card_type}</div>
          <div className="order_column">{card.price} AUD</div>
          <div className="order_column">
            <CustomInput className="order_column head">
              <input 
                min="0"
                type="number" 
                value={index === 0 ? quantityHigh : quantityPremium} 
                name="quantity"
                onChange={index === 0 ? onInputChangeHigh : onInputChangePremium}
              />
            </CustomInput>
          </div>
          <div className="order_column">
            {index === 0 ? highTotalPrice : premiumTotalPrice} AUD
          </div>
        </NewOrderCell>
      ))}
      <SubTotal>
        <div className="d-flex flex-row justify-content-end">
          <span className="span-label">Sub Total: </span>
          <span> {totalPrice()} AUD </span>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <span className="span-label">Shipping Fee: </span>
          { totalQuantity() < 10 && totalQuantity() > 0 ?
            <span> 30 AUD </span> : 
            <span> 0 AUD </span>
          }
        </div>
        <div className="d-flex flex-row justify-content-end">
          <span className="span-label">Discount: </span>
          { totalQuantity() > 20 ?
            <span> 0.9 AUD </span> : 
            <span> 0 AUD </span>
          }
        </div>
        <div className="d-flex flex-row justify-content-end">
          <span className="span-label">Total Amount: </span>
          <span> {availableBalance()} AUD </span>
        </div>
      </SubTotal>
      <OrderPlace className="d-flex flex-row justify-content-end">
        <button 
          type="button"
          onClick={handlePlaceOrder}
          disabled={totalQuantity() === 0 || loading}
        >
          Place Order
          {loading && (
              <CustomeSpinner size="sm" />
            )}
        </button>
      </OrderPlace>
    </div>
  );
};
export default NewOrder;