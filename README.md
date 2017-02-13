# README

## Introduction
This repo is based off of Stephen Grider's [Modern React and Redux](#) course from Udemy.
The app was built using the create-react-app CLI and its purpose is to run through a basic
Redux example and learn how to build a project with Redux.

## Set-up
- These are the basic steps I followed to build the app:

```sh
create-react-app book_list_CM
npm install --save redux
npm install --save react-redux
# it was recommended that I insall redux tools; I did not for this example.
# That command is: npm install --save-dev redux-devtools
```
- I should now be all set and able to follow along with the lectures.  In my dependencies, 
I do not have:
  - lodash
  - react-router
- if I have problems later, I will install them...

## Reducer Set-up
- After clearing out the boilerplate code, I created three folders: actions, components, and
reducers.
- Under `/reducers`, I created two files: `index.js` and `reducer_books.js`
- `reducer_books` is just my list of books for this project so it's nothing too exciting.
- `index` has some interesting code that we will discuss later but I do want to go over the
basics of what I think is going on, now:

```javascript
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';

const rootReducer = combineReducers({
	books: BooksReducer
});

export default rootReducer;
```

  - First, we are importing the `combineReducers` function from redux which, as its name implies,
  will combine all of my reducers into one reducer called 'rootReducer'
  - next, I import my BooksReducer which is just my list of books in an array.  Notice though that
  it's not just the array, it's a _function_ that returns an array of objects, with each object
  having a title and number of pages.
  - this is where I create my `rootReducer` function which utilizes the combineReducers function.
  Based on this first reducer, I am assuming that for each reducer, the pattern will be a 'key' of
  some kind and then the value is the reducer.
  - Lastly, we export...would `export default rootReducer...` work as well?
  - L39

-L40
- connect react to redux is done with a separate library called 'react-redux'; hence that other
install I did
- a container is React component that touches state in Redux
- but how do we decide which components to promote to a 'container'??  Answer that in L41
- Nothing too crazy was done in L40; I generally understand what he's doing.  As just a reminder,
we haven't actually set anything up or passed in props to the BookList.  So when he's typing
`this.props.books.map`, he's doing that with the knowledge that we WILL want to do that.

- Start on L41



