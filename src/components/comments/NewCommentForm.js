import { useRef, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../libs/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const { status, sendRequest, error } = useHttp(addComment, false);
  const { onAddedComment } = props;
  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [onAddedComment, status, error]);
  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const eneterdText = commentTextRef.current.value;
    // optional: Could validate here
    // send comment to server
    sendRequest({ commentData: { text: eneterdText }, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' ? (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={classes.control} onSubmit={submitFormHandler}>
            <label htmlFor='comment'>Your Comment</label>
            <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className='btn'>Add Comment</button>
          </div>
        </>
      )}
    </form>
  );
};

export default NewCommentForm;
