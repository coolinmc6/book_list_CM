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

## Lecture 40 - 43: Make BookList Container
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
- **Quick Note:** I was get a an error saying 'Script URL is a form of eval   no-script-url'.
That error is actually a 'warning' from eslint telling me not to use JavaScript scripts in
my .js files (I believe).  I have not actually violated that error, it is actually just the title
of one of my books in my books_reducer.  I changed it to 'Javacript' just to stop seeing the 
little warning...

## L43: Review
- Redux serves to construct the application station and React provides the views to display
that state.  They are inherently disconnected and only get connected through the use of
React-Redux library.
- Our application state is generated by a reducer function.
- Our books reducer always returns an array of books; always the same array.  It is an array
of objects
- We added the books reducer to our combined reducer called rootReducer
- That rootReducer is going to add a key to our global global application state called 'books'
where the key is 'books' and the value is whatever gets returned from the BooksReducer which 
is our array of books
- Next, we created BookList which started off as a component but then we decided that it needed
to be aware of our state within our redux side of the application.  This means that we
promoted it to a container
- We did that by first importing connected from react-redux, we defined mapStateToProps and
we hooked our component together with MapStateToProps to our compponent, BookList, with the 
connect function
- We chose the component BookList to connect to the redux store because only BookList really
cares about the list of books.  The App doesn't care and doesn't really need to know about the
list of books.
- Then we added the BookList component to our app so that it rendered
- Last, we refreshed our app.  Redux generated a state object that contained our books and then
mapped our state as props to our component, BookList.  Because our state was updated, our 
component re-rendered with our list of books.
- Lastly, a container is normal component that gets bonded to the application state.  Every 
time our application state changes, our component re-renders.

### In my own words...
- React and Redux are separate libraries; React handles the views, Redux handles our 
application's state. 
  - State is essentially all the stored information for our app
- React and Redux are separate libraries and are NOT inherently connected; we must use
another library, react-redux, to connect them.
- Our application state is generated by a reducer function or reducer functions.  We have
two (or one, depending on how you want to count) reducers right now: our reducer_books which
returns a list of books and our `rootReducer` which aggregates all of our reducers.
- The `rootReducer` is going to add a key to our global application state.  That key, cleverly
titled 'books', contains an array of all of our books.  That 'books' key more specifically
is set to the results of our `reducer_books` reducer which, as I said above, simply returns
an array of objects, with each object being a book.
- Our BookList component needs to know about our list of books.  Our App component, which is 
really just holding the BookList component, doesn't really need to know anything, so we are
going to make BookList a container by making it aware of our application state.
- We make our component a container in several key steps:
  - import {connect} from react-redux so that we can connect our component (React) to our
  global application state (Redux)
  - we mapped our application state to props so that we can use it in our component (e.g.
  `this.props.books`) by writing our mapStateToProps function.  As described from another 
  lecture, mapStateToProps peels off a particular piece of state and then allows us to use
  that piece as props in our component.  To do this, we have to return an object with one 
  key, `books:`, and its value is whatever we have in our global application state for books, 
  which is just `state.books`.
  - lastly, we connect the two by calling connect as such: 
  `export default connect(mapStateToProps)(BookList)`.  We preface the connection with 
  `export default` because that is what we want available in our `<App />` component: the 
  combined component and application state 'thing', not just the BookList component.
- Although I had to make some of my own changes to imitate Stephen's setup, when we refreshed
our app, a few things happened:
  - Redux generated a state object that contained our list of books.
  - That list of books was mapped as props to our component, BookList
  - Because our state was updated, our component re-renders automatically and now displays
  my list of books

## L44: Actions and Action Creators
- Everything in a redux application is typically triggered by the user (click on a button, 
selecting an item from a dropdown, hovering, etc.)
- An action creator is a function that returns an action, which is an object
- the action creator returns an object which is then sent to all the different reducers
  - that object typically has a `type` and a `payload`
- Reducers can choose to return a different piece of state depening on the action
  - typically, in all of the reducers, we set up a SWITCH statement that looks at the action
  type and then does something.
  - Reducers don't have to care about all actions; so if it has an action.type that it doesn't
  care about, it'll just return our current state.
- That new piece of state is piped into our application state which then gets pumped into our
React application which THEN causes all of our affected components to re-render

## Lecture 45: Binding Action Creators
- I have a ton of notes in my BookList container about how we connected the selectBook action
to it but here are the basics:
  - #1 - imported selectBook (the action we created) and bindActionCreators (from redux)
  - #2 - wrote mapDispatchToProps function
  - #3 - added mapDispatchToProps to connect function at bottom

## Lecture 46: Creating an Action
- In this lecture, we made sure that our action creator was connected to our BookList container.
Again, what is it that we are trying to do? We want the user to be able to click on one of our
books in that list and then in the middle of the page, information about that book will show
up.  To do this, we need another piece of state called 'activeBook'. We haven't done anything
yet to do that but for now, to get there, we need an action creator that receives an object, 
the book, and creates an action with a type and payload.
- For that action to be called, we added an event handler.  So when an `<li>` element is 
clicked, we call selectBook and pass it the book that was clicked.  That code looks like this:
`onClick={() => this.props.selectBook(book) }`.
  - as a reminder, we can can call `this.props.selectBook` because of mapDispatchToProps that
  we wrote in the last section.
  - the argument we are passing, `book`, is the name of the object we are passing because of
  how we wrote the map function.  The map function is going through each item in the books array
  and we are referring to each item in that array as `book`.  So simply passing `book` to our
  selectBook() function is all we have to do.
- If you look at the action that we are returning, it's essentially the exact same thing
that we received, a book object, but it also has a `type` property with a string as its value.
- Start L47 next and when complete, run through these notes and summarize connecting my 
component to state, connecting my action to my container, and how we created the action.












