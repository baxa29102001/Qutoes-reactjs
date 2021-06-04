import React, { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../libs/api';
import NotFound from './NotFound';

function QuoteDetail() {
  const {
    sendRequest,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (!quote || error) {
    return <NotFound />;
  }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comment`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comment`} component={Comments} />
    </div>
  );
}

export default QuoteDetail;
