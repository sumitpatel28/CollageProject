import axios from 'axios';
import config from '../../config/config';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${config.baseURL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        if (error.response) {
            dispatch(authFailed(error.response.data.message || "Authentication failed"));
        } else if (error.request) {
            dispatch(authError("Network error - please check your internet connection"));
        } else {
            dispatch(authError("An error occurred during authentication"));
        }
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${config.baseURL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        if (result.data.schoolName || result.data.school) {
            dispatch(result.data.schoolName ? authSuccess(result.data) : stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        if (error.response) {
            dispatch(authFailed(error.response.data.message || "Registration failed"));
        } else if (error.request) {
            dispatch(authError("Network error - please check your internet connection"));
        } else {
            dispatch(authError("An error occurred during registration"));
        }
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${config.baseURL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${config.baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        if (error.response) {
            dispatch(getFailed(error.response.data.message || "Delete operation failed"));
        } else if (error.request) {
            dispatch(getError("Network error - please check your internet connection"));
        } else {
            dispatch(getError("An error occurred during delete operation"));
        }
    }
};

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${config.baseURL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${config.baseURL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};