import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      status: 'pending',
      data: null,
      error: null,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      status: 'completed',
      data: action.payload,
      error: null,
    };
  }

  if (action.type === 'FAIL') {
    return {
      status: 'completed',
      data: null,
      error: action.errorMessage,
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [state, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (quote) => {
      dispatch({ type: 'SEND' });
      try {
        let data = await requestFunction(quote);
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FAIL', errorMessage: error.message });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...state,
  };
}
export default useHttp;
