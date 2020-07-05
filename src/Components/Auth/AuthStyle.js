import styled from 'styled-components';
import { Spinner } from 'reactstrap';

export const AuthForm = styled.div`
  width: 40%;
  margin: 40px auto;
  background: #f3f3f3;
  padding: 3%;
  border-radius: 6px;
  .input-label {
    display: flex !important;
  }
  input[type=checkbox]{
    margin-top: 6px;
    margin-right: 4px;
  }
`;

export const SubmitButton = styled.div`
  button {
    width: 150px;
    background: #6d6d71;
    color: white;
    &:hover {
      color: white !important;
    }
  }
`;

export const CustomeSpinner = styled(Spinner)`
  border-width: .1em !important;
  margin-left: 7px;
`;
