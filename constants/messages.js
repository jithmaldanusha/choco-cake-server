const SERVER_ERROR = { en: 'Server error. Please try again in a bit.' };

const SIGNUP_FAILED = { en: 'Sign up failed. Please check your details.' };
const USER_EXISTS = { en: 'Looks like you’ve already registered that email.' };

const SIGNIN_FAILED = { en: 'Sign in failed. Please check your details.' };
const INVALID_EMAIL = { en: 'Hey! Your email address is not valid.' };
const INVALID_PASSWORD = { en: 'Looks like your password is incorrect!' };
const USER_NOT_FOUND = { en: 'We couldn’t verify your email address. Please try again.' };
const USER_DISABLED = { en: 'Sorry! You have been disabled. Get in touch with us.' };
const LOGIN_SUCCESS = { en: 'Logged in successfully' };

const FORGOT_PASSWORD_INVALID_EMAIL = { en: 'Something looks wrong. Please recheck your email address.' };
const SEND_RESET_CODE = { en: 'Password Reset Code Sent.' };
const FORGOT_PASSWORD_FAILED = { en: 'Password reset has failed. Please try again.' };
const CODE_ALREADY_SENT = { en: 'Password reset request already sent' };
const INVALID_RESET_CODE = { en: 'Looks like your code is incorrect!' };

const CHANGE_PASSWORD_FAILED = { en: 'Old password is incorrect. Please try again.' };
const USER_PROFILE_NOT_EXISTS = { en: 'User profile does not exist. Please check your details.' };

const IMAGE_UPLOAD_FAILED = { en: 'Image upload has failed. Please try again.' };

const SAVE_SUCCESS = { en: 'Saved Successfully' };
const UPDATE_SUCCESS = { en: 'Updated Successfully' };
const UPLOAD_SUCEESS = { en: 'Image Uploaded Successfully' };
const DELETE_SUCCESS = { en: 'Deleted Successfully' };

const SUCCESS = { en: 'Retrieved data successfully ' };
const FAILED = { en: 'Retrieved data failed' };

const UNAUTHORIZED = { en: 'Unauthorized user' };

const NOT_FOUND = { en: 'Not found' };
const BAD_REQUEST = { en: 'Bad request' };

const INVALID_PROMO = { en: 'Hey! Promo code is not valid.' };

const ORDER_ERROR = { en: "We can't process your order. Please try again" };

const INVALID_ADMIN_USER_INPUTS = { en: 'Double check your inputs all the data must be filled with correct details' };
const INVALID_ADMIN_EMAIL = { en: 'Email address is might be used by another one' };
const INVALID_TYPE = { en: 'Check entered type again ' };
const INVALID_COUNTRY = { en: 'Double check the country details all must be filled ' };
const INVALID_BOOLEAN = { en: 'Invalid boolean input' };
const INVALID_COUNTRY_CODE = { en: 'Country code is already in the database' };
const INVALID_STATUS = { en: 'Invalid status it must be true or false' };
const INVALID_QUESTION = { en: 'Invalid question ID is passed' };
const INVALID_REGIONS = { en: 'Invalid regions passed' };
const INVALID_EMAIL_AUTH = { en: 'Check your email again, it might be an invalid or your access is blocked by the system' };

module.exports = {
  SERVER_ERROR,
  SIGNUP_FAILED,
  USER_EXISTS,
  SIGNIN_FAILED,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
  USER_DISABLED,
  FORGOT_PASSWORD_INVALID_EMAIL,
  SEND_RESET_CODE,
  FORGOT_PASSWORD_FAILED,
  CODE_ALREADY_SENT,
  INVALID_RESET_CODE,
  CHANGE_PASSWORD_FAILED,
  USER_PROFILE_NOT_EXISTS,
  IMAGE_UPLOAD_FAILED,
  SAVE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  SUCCESS,
  FAILED,
  LOGIN_SUCCESS,
  UNAUTHORIZED,
  NOT_FOUND,
  BAD_REQUEST,
  INVALID_PROMO,
  UPLOAD_SUCEESS,
  ORDER_ERROR,
  INVALID_ADMIN_USER_INPUTS,
  INVALID_ADMIN_EMAIL,
  INVALID_COUNTRY,
  INVALID_BOOLEAN,
  INVALID_COUNTRY_CODE,
  INVALID_QUESTION,
  INVALID_TYPE,
  INVALID_STATUS,
  INVALID_REGIONS,
  INVALID_EMAIL_AUTH
};
