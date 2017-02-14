import React, {Component } from 'react';
import { connect } from 'react-redux';

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

// this function takes in ALL of state and what it returns is what we can then use as props
// in our component.  so if we return { blah: '1234'}, then console.log(this.props.blah) will show 1234
// so we definitely know that we want a books property and we know that the value should be our books
function mapStateToProps(state) {
	// what is returned will show up as props inside of BookList
	return {
		books: state.books
	}
}
// connect takes a function and a component and produces a 'container'
// the mapStateToProps function is the glue between React and Redux
export default connect(mapStateToProps)(BookList)