import React, {Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
// bindActionCreators is what makes sure that the action that we've generated flows through
// all the reducers in our application

class BookList extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li 
					key={book.title} 
					onClick={() => this.props.selectBook(book) }
					className="list-group-item">
					{book.title}</li>
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

// this function takes in ALL of state and what it returns is what we can then use as props
// in our component.  so if we return { blah: '1234'}, then console.log(this.props.blah) will show 1234
// so we definitely know that we want a books property and we know that the value should be our books
function mapStateToProps(state) {
	// what is returned will show up as props inside of BookList
	return {
		books: state.books
	}
}

// Anything returned from this function will end up as props on the BookList container
// this.props.selectBook will call our action creator now
function mapDispatchToProps(dispatch) {
	// whenever selectBook is called, the result should be passed to all of our Reducers
	// THIS is what bindActionCreators does.
	// So, I want to make sure that it all flows through our dispatch function which takes
	// all of our actions and passes them to all of our reducers
	return bindActionCreators({ selectBook: selectBook }, dispatch)
}
// connect takes a function and a component and produces a 'container'
// the mapStateToProps function is the glue between React and Redux

// Promote BookList from a componet to a container - it needs to know about this new
// dispatch method, selectBook.  Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList)


// #1 - imported selectBook (the action we created) and bindActionCreators (from redux)
// #2 - wrote mapDispatchToProps function
// #3 - added mapDispatchToProps to connect function at bottom