export function createStore(reducer) {
  let state = reducer();
  let listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);

      listeners.forEach(listener => listener(state));
    },
    subscribe(cb) {
      if (typeof cb !== 'function') {
        throw new Error('Callback should be a function');
      }

      listeners.push(cb);

      return () => {
        listeners = listeners
          .filter(listener => listener !== cb);
      };
    },
  };
}
