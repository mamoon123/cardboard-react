export const VALID_EMAIL_REGEX = new RegExp(
  /[\w-]+@([\w-]+\.)+[\w-]+/,
);

export const STRONG_PASSWORD_REGEX = new RegExp(
  '(?=.{8})((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*d)(?=.*[a-zA-Z])(?=.*[\\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_])).*',
);

export const LOWER_CASE_LETTER_REGEX = new RegExp(
  '^(?=.*[a-z])',
);

export const UPPER_CASE_LETTER_REGEX = new RegExp(
  '(?=.*[A-Z])',
);

export const DIGIT_NUMBER_REGEX = new RegExp(
  '(?=.*[0-9])',
);

export const SPECIAL_CHARACTER_REGEX = new RegExp(
  '(?=.[!@#$%^&])',
);

export const VALID_NAME_REGEX = new RegExp(
  '^[a-zA-Z0-9_ .-]*$',
);

export const PASSWORD_LENGTH_REGEX = new RegExp(
  '(?=.{8})',
);

export const VALID_MOBILE_NUMBER_REGEX = new RegExp(
  '(?=.*[0-9])',
);
export const urlPattern = new RegExp('^(https?:\\/\\/)?'
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
    + '((\\d{1,3}\\.){3}\\d{1,3}))'
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
    + '(\\?[;&a-z\\d%_.~+=-]*)?'
    + '(\\#[-a-z\\d_]*)?$', 'i');
    
export const ACCESS_TOKEN='access_token';
export const USER='user';
export const REACT_APP_API_URL='https://scenic-cuyahoga-valley-42971.herokuapp.com'
// export const REACT_APP_API_URL='http://localhost:3000'
