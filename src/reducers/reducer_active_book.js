// reducers always get two arguments: state and action
// State argument is NOT application state, it's only the state this reducer
// is responsible for
// if state is undefined, set it to null
export default function(state = null, action) {

	switch(action.type) {
		case 'BOOK_SELECTED':
			return action.payload;
		

	}

	return state

}

// Notice that I am simply returning action.payload...which right now, feels like
// it's only PART of the global state.  It felt off until I remembered what the
// rootReducer looks like: it has a key 'activeBook' that takes the value of the
// return of this reducer.  So the fact that I am only returning action.payload
// is not that crazy.