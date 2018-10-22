import * as accountTypes from "modules/account/types";
import * as types from "./types";

export const initStatePartial = {
    date: {
        from: null,
        to: null,
    },
    price: {
        currency: null,
        from: null,
        to: null,
    },
    search: "",
    time: {
        from: {
            hours: null,
            meridiem: types.ANTE_MERIDIEM,
            minutes: null,
        },
        to: {
            hours: null,
            meridiem: types.ANTE_MERIDIEM,
            minutes: null,
        },
    },
    type: types.ALL_PAYMENTS,
};

export const initStateFilter = {
    onchain: initStatePartial,
    recurring: initStatePartial,
    regular: initStatePartial,
};

const defaultState = JSON.parse(JSON.stringify(initStateFilter));

const filterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.CLEAR_ALL_FILTERS:
        case accountTypes.LOGOUT_ACCOUNT:
            return defaultState;
        case types.SET_REGULAR_FILTER_PART:
            return {
                ...state,
                regular: {
                    ...state.regular,
                    ...action.payload,
                },
            };
        case types.SET_RECURRING_FILTER_PART:
            return {
                ...state,
                recurring: {
                    ...state.recurring,
                    ...action.payload,
                },
            };
        case types.SET_ONCHAIN_FILTER_PART:
            return {
                ...state,
                onchain: {
                    ...state.onchain,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default filterReducer;