import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortedFunc = (quotes, ascending) => {
  return quotes.sort((a, b) => {
    if (ascending) {
      return a.id > b.id ? 1 : -1;
    } else {
      return a.id < b.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isAscending = params.get('sort') === 'asc';
  const sortingHandler = () => {
    history.push('/quotes?sort=' + (isAscending ? 'desc' : 'asc'));
  };

  const sortedQuotes = sortedFunc(props.quotes, isAscending);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          Sort {isAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
