import {
	LOG_IN_START,
	LOG_IN_SUCCESS,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
	RESET_AUTH_STATE,
	FORGOT_PASSWORD_START,
	FORGOT_PASSWORD_SUCCESS,
	VERIFY_OTP_START,
	VERIFY_OTP_SUCCESS,
	RESET_PASSWORD_START,
	RESET_PASSWORD_SUCCESS,
	FB_LOG_IN_START,
	FB_LOG_IN_SUCCESS
} from "../actions/authActions";

const initialState = {
	loadingError: null,
	loggedIn: false,
	isLoginSuccessful: false,
	user: null,
	isSignupSuccessful: false,
	isForgotPassSuccessful: false,
	forgotPassResponse: null,
	isVerifyOTPSuccessful: false,
	verifyOTPResponse: null,
	isResetPassSuccessful: false,
	resetPassResponse: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_START:
			return { ...state, isLoginSuccessful: false };
		case LOG_IN_SUCCESS:
			return { ...state, isLoginSuccessful: true, user: action.data, loggedIn: true };
		case SIGN_UP_START:
			return { ...state, isSignupSuccessful: false };
		case SIGN_UP_SUCCESS:
			return { ...state, isSignupSuccessful: true, user: action.data, loggedIn: true };
		case FORGOT_PASSWORD_START:
			return { ...state, isForgotPassSuccessful: false };
		case FORGOT_PASSWORD_SUCCESS:
			return { ...state, isForgotPassSuccessful: true, forgotPassResponse: action.data };
		case VERIFY_OTP_START:
			return { ...state, isVerifyOTPSuccessful: false };
		case VERIFY_OTP_SUCCESS:
			return { ...state, isVerifyOTPSuccessful: true, verifyOTPResponse: action.data };
		case RESET_PASSWORD_START:
			return { ...state, isResetPassSuccessful: false };
		case RESET_PASSWORD_SUCCESS:
			return { ...state, isResetPassSuccessful: true, resetPassResponse: action.data };
		case FB_LOG_IN_START:
			return { ...state, isLoginSuccessful: false };
		case FB_LOG_IN_SUCCESS:
			return { ...state, isLoginSuccessful: true, user: action.data, loggedIn: true };
		case RESET_AUTH_STATE:
			return initialState;
		default:
			return state;
	}
};

export default authReducer;