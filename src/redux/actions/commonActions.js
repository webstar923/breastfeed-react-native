import { showAlert } from "src/utils/native";
import resetAuthActions from "./resetAuthActions";

export const LOADING_START = "LOADING_START";
export const LOADING_SUCCESSFUL = "LOADING_SUCCESSFUL";
export const LOADING_ERROR = "LOADING_ERROR";
export const LOADING_ERROR_RESET = "LOADING_ERROR_RESET";

/* LOADING ACTIONS */
export const loadingStart = () => ({
	type: LOADING_START
});

export const loadingEnd = () => ({
	type: LOADING_SUCCESSFUL
});

export const loadingFailed = (error) => ({
	type: LOADING_ERROR,
	error
});

export function loadingError(error) {
	return (dispatch) => {
		if(error.response.status === 401) {
			dispatch(resetAuthActions());
			dispatch(loadingFailed(error));
			showAlert("Error", "Your login session has been expired!", "", () => {});
			return;
		}

		let errorMessage = (error.response && error.response.data && error.response.data.error) ? error.response.data.message : "Something went wrong please try later!";
		dispatch(loadingFailed(error));
		showAlert("Error", errorMessage, "", () => {});
	};
}