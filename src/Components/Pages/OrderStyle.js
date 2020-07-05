import styled from 'styled-components';

export const OrderCell = styled.div`
  width: 97%;
  margin: 10px auto;
  background: #f3f3f3;
  padding: 10px;
  .order_column {
    width: 14.3% !important;
    text-align: left;
    height: 24px;
  }
  .head {
    font-weight: bold;
  }
`;
export const NewOrderCell = styled.div`
  width: 97%;
  margin: 10px auto;
  background: #f3f3f3;
  padding: 25px 10px;
  .order_column {
    width: 14.3% !important;
    text-align: left;
    height: 24px;
  }
  .head {
    font-weight: bold;
  }
`;
export const UnitPrice = styled.div`
  background: #f3f3f3;
`;
export const CustomSelectOption = styled.div`
  select {
    width: 300px;
    height: 40px;
    margin: 0px 20px;
    padding: 0px 4px;
    border: 1px solid #cacaca;
    border-radius: 4px;
    &:focus {
      border: 1px solid #cacaca !important;
      box-shadow: none;
      outline: 0px; 
    }
  }
`;
export const CustomInput = styled.div`
  input {
    width: 100px;
    height: 30px;
    border: 1px solid #cacaca;
    border-radius: 4px;
    padding: 0px 4px 0px 8px;
    margin-top: -5px;
    &:focus {
      border: 1px solid #cacaca !important;
      box-shadow: none;
      outline: 0px; 
    }
  }
`;
export const SubTotal = styled.div`
  padding: 10px 20px !important;
  span {
    width: 150px;
  }
  .span-label {
    width: 150px;
    text-align: right;
  }
`;

export const OrderPlace = styled.div`
  padding: 10px 75px !important;
  button {
    width: 150px;
    background: #6d6d71;
    color: white;
    border: 1px solid #6d6d71;
    border-radius: 4px;
    padding: 5px 0px;
    &:hover {
      color: white !important;
    }
  }
`;