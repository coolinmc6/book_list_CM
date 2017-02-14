export function selectBook(book) {
	// selectBook is an ActionCreator, it needs to return an action, an object
	// with a type property
	console.log(book.title, book.pages);
	return {
		type: 'BOOK_SELECTED',
		payload: book
	};
}
// it isn't explicit here but a book is an object that represents a book.  As you can see,
// book.title is then displayed when this action is called.
// we can't just call this in an event handler; we need to wire it into Redux