const initialState = {
    all: [],
    totalPages: 0,
    page: 1,
}

const SET_ALL_NEWS = 'SET_ALL_NEWS'

export const setAllNews = (news) => {
    return {
        type: SET_ALL_NEWS,
        payload: news
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ALL_NEWS: {
            return {
                ...state,
                all: action.payload.items,
                actualPage: action.payload.actualNumber,
                totalPages: action.payload.totalPages
            }
        }
        default: {
            return state
        }
    }
}

export default reducer