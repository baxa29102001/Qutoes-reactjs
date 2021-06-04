import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../libs/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const params = useParams();

  const { id } = params;
  const {
    sendRequest,
    data: comments,
    // error,
    status,
  } = useHttp(getAllComments);

  const [isAddingComment, setIsAddingComment] = useState(false);
  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  const reRender = useCallback(() => {
    sendRequest(id);
  }, [id, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  let contentComment;
  if (status === 'pending') {
    contentComment = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && (!comments || comments.length === 0)) {
    contentComment = (
      <div className='centered'>
        <p>No comments</p>
      </div>
    );
  }

  if (status === 'completed' && comments.length > 0) {
    contentComment = <CommentsList comments={comments} />;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={id} onAddedComment={reRender} />
      )}
      {contentComment}
    </section>
  );
};

export default Comments;
