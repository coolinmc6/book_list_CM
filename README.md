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
- L41
- a container is just a component that has direct access to state within redux
- in general, we want the most parent component that cares about a particular piece of state to be a
container
- L42
- to form a component between react and redux, we use react-redux library
- to make that connection, we had to bring the connect property:
`import { connect } from 'react-redux';`
- So make this a container, simply doing what Stephen does in L42 is not enough.  In the starter pack, 
he did a few things for me already that I had to go back and troubleshoot but let's start with BookList.
How do I make a component into a container?

```javascript
import React, {Component } from 'react';
import { connect } from 'react-redux'; // NEW

// removed the 'export default' to the bottom
class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className="list-group-item">{book.title}</li>
      );

    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}
// added my mapStateToProps function
function mapStateToProps(state) {
  return {
    books: state.books
  }
}
// I am no longer just exporting the component, I am exporting the component connected to state
export default connect(mapStateToProps)(BookList)
```
- First, I had to import connect from react-redux; that's probably pretty standard
- Next, because I will no longer just be exporting BookList so I removed 'export default'
- I wrote my mapStateToProps function.  This function takes one argument, state.  To be more specific, 
it takes ALL of state...that means it takes the ENTIRE global state object and it is peeling off just the
bit that I need.
  - As I can see in my return statement in renderList(), I need to a books property.  So I already know what
  the key of my object I'm returning is.
  - As for the value, I know that I want the list of books in state so state.books.
- Lastly, I need to export my component connected to state which I did using the connect function which takes
my mapStateToProps function and then right next to it my component, BookList
- At this point, it still doesn't work, I didn't have some of Grider's starter code so in my index.js file, I had 
to do a few things.
  - Proper imports at the top:

  ```javascript
  import { Provider } from 'react-redux'; // NEW
  import { createStore, applyMiddleware } from 'redux'; //NEW

  import App from './App';
  import reducers from './reducers'; // NEW
  ```
  - The next two parts I'll wrap into one because I don't entirely understand them:

  ```javascript
  const createStoreWithMiddleware = applyMiddleware()(createStore);

  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  ```
  - first, he creates a constant that calls whatever applyMiddleware() does and connects it somehow to
  createStore
  - Next, you can see that we wrap our `<App />` element in `<Provider />` tags, with the store be passed
  the constant we created and our reducers.
  - **I need to revisit this and understand this setup part which we may address in a different app.**

