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

- L47: we wrote the active_book reducer

## Lecture 48: Consuming Actions in Reducers Continued
- I built the basic structure for my BookDetail component.  Here it is (nothing new):

```javascript
import React, { Component } from 'react';

export default class BookDetail extends Component {

  render() {
    return (
      <div>Book Details!</div>
    )
  }
}
```
- Now let's see how it changes so that I can hook it up to Redux:

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {

  render() {
    return (
      <div>Book Details!</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook
  }
}

export default connect(mapStateToProps)(BookDetail)
```
- So what did we do??
  - We imported the connect function from React-Redux
  - We defined our mapStateToProps function which takes one argument, state (our GLOBAL state), and peels
  off the bit that we need, activeBook, and puts it in a property that we can access through our `props`
  in the BookDetail component as `book`
  - We exported our connected component (now a 'container') by calling the connect function and passing it
  the mapStateToProps function and our component.
- This is how we connect our component to Redux; we haven't brought in the action yet...I'm sure we do that
next.

## Lecture 49: Conditional Rendering

## Lecture 50: Reducers and Actions Review
- Redux is charge of managing our application state
- State is a single, plain JS object
- component state is different than application state
- Our component state is COMPLETELY separate from our application state
- Our application state is formed by our reducers
- Reducers get tied together with this combinedReducers function
- Each key gets assigned one reducer
- Our reducers are in charge of changing state over time and they do that through the use of actions
- Each Reducer has the option to return a different piece of state based on the type of action received
- Action creators are just simple functions that return an action
- Actions are JS objects that must have a type defined and they can optionally have a payload or other 
properties; payload is just convention
- Application Operation:
  - When a user clicks on something, it calls an action creator: `onClick={() => this.props.selectBook(book) }`
  from BookList
    - we can call selectBook from props because of our `mapDispatchToProps` function that we've defined
    at the bottom of BookList
  - The action creator, which takes in an object, `book`, and returns an object that contains the type of
  the action and a payload, which in this case, is the book itself.
    - how did we know that we wanted to take in the ENTIRE book?  Can we theoretically pass in anything there, 
    not just a JS object?
  - That action is automatically sent to all of our different reducers.  And for the reducers that cared
  about that particular action, it returns a piece of state which represents part of the global state.
  - A new global state is assembled which then notifies the containers of the change which causes them
  to rerender with new props.

## CM Summary
- I am trying to distill all of this into a few simple steps that I could follow that would allow me
to get up and running quickly with a react app that has Redux-managed state.  These are the basics
steps:
  1. Project setup and dependencies
  ```sh
  create-react-app app_name
  cd app_name
  npm install --save redux
  npm install --save react-redux
  ```
  2. Bring in Redux to index.js
    - to bring in Redux, I need to wrap my `<App />` component in `<Provider>` tags.
    - I also need to create a `store` for Redux and then pass that `store` as prop to my `<Provider>`
    - My store takes an argument, my rootReducer.  Grider's boilerplate doesn't make this as obvious but
    what is happening is that all the reducers are being combined in my `/reducers/index.js` file.  It is
    being imported into my `/src/index.js` file as just 'reducers' because my app knows that if it goes 
    to the reducers directory and no file is specified, just grab the `index.js` file.  In that file, I am
    exporting rootReducer.
  3. Writing Reducers
    - Reducers are functions so I can start most with `export default function(){ ...`
    - My rootReducer combines them all to create my state.  Each reducer gets its own key with the value
    being whatever is returned by the reducer
    - When writing a reducer, the function typically takes two arguments: the piece of state that it is
    responsible for, and the action.  It looks like it is best practice to just default the state to null
    in case state is undefined => `export default function(state = null, action) {`
    - Reducers typically use switch statements which determine what the reducer returns based on the type
    of action, `action.type`.  Remember, the action will run through ALL reducers so if the action type
    does not apply, you can simply return state.
  4. Promoting Components to Containers
    - It seems like it'd be best to start writing the component like normal (class-based component) and 
    then add the Redux...so first step, write the class-based component.
    - import connect from React-redux
    - write the mapStateToProps function to map the piece of state that you want to a property that you
    can access as 'props' or `this.props.property` in your component
    - export not just your component but your CONNECTED component by doing: 
    `export default connect(mapStateToProps)(BookList)`
  5. Write Your Action
    - Now that you have your container, what do you want your action to do?  How do you want it to be
    activated?  I don't know exactly the appropriate order in which I'd figure this out but for this app, 
    I know that when the user clicks on a book, I want to show them the details of the book in another 
    component.  So when they click on a book, we will change the activeBook property of our global state.
      - Action creators produce actions, so what do I want my action to have?  It must have a type but
      why is my payload the entire book object?  I guess that's arbitrary and given how small a book 
      object is, it probably doesn't matter, so I'll just have my action creator receive the entire book
      object and return a new object that contains the type and then the entire book.
      - As a reminder, I already wrote my reducer to return action.payload if my type matches so I already
      know what I want to return.  So it sounds like the reducer and action creators are written in tandem.
      Action creators always create actions, which are objects.  Reducers receive state (not GLOBAL state)
      and the action, which is an object.  
      - All of my reducers are brought together in my rootReducer which is just the combination of all 
      of them, with each reducer being assigned a key.  So in my global state, my `state.books` is just
      my array of books from my books reducer, my `state.activeBook` is just the return of my ActiveBook
      reducer.
      - With this knowledge, I can move on...
  6. Bring Action into Container
    - First, import my action (file location) AND the bindActionCreators function from Redux.
    - Write the mapDispatchToProps that allows me to call the selectBook function through my props in 
    my component.  So notice that I'm not passing props down the normal way, that's what this function
    is doing for me.
      - my mapDispatchToProps takes one argument, dispatch, and it returns my bindActionCreators that
      takes two arguments: on object containing my action as a key-value pair, `{selectBook : selectBook}`, 
      and the function dispatch.
      - I still need to better understand this part but there is some good info in the React-Redux docs
    - Lastly, add my mapDispatchToProps to my connect function as the second argument.  If you look at the
    docs, the connect function takes a number of arguments with mapStateToProps as always the first, 
    mapDispatchToProps as always the second, and then some others.
  7. Add Action to Event Handler
    - Now I just need to add my selectBook action creator, a function, to an event handler of my choosing
    which, as I've already said, will be onClick: `onClick={() => this.props.selectBook(book) }`
    - At this point, I should have an app that when a user clicks on a book, the activeBook property of my
    state should change to whatever I clicked.  It is now MY responsibility to use that information somewhere,
    for example, change the information that is displayed by creating my BookDetails component.
  













