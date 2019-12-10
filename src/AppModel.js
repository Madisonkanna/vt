
const createStore = (reducer, initialState) => {
    const subscribers = [];
    let currentState = initialState;
  
    return {
      getState(){
        return currentState;
      },
      subscribe(fn){
        subscribers.push(fn);
        fn(currentState);
      },
      dispatch(action){
        currentState = deepCopy(reducer(currentState, action));
        subscribers.forEach(subFn => subFn(currentState));
      }
    };
  };

  // custom recursive object and array deep copy 
  function deepCopy(obj) {
    return(Array.isArray(obj) ? Object.values : obj=>obj)(Object.keys(obj).reduce((acc, key) => 
      ({...acc, [key]: (
        !obj[key] ? obj[key]
        : typeof obj[key] === 'object' ? deepCopy(obj[key])
        : obj[key]
      )}),
      {}
    ))
  }

const reducers = {
    INCREMENT: (state) => {
      state.count++
      return state
    },
    DECREMENT: (state) => {
      state.count--
      return state
    }
  }
  
  const reducer = (state, action) => reducers[action.type] ? reducers[action.type](state) : state
  
  const initialState = { 
    count: 0 
  };
  
  const countEl = document.getElementById('count');
  const modelApi = createStore(reducer, initialState)
  
  modelApi.subscribe(state => {  
    // if(Number(countEl.innerHTML) !== state.count) {
    //   countEl.innerHTML = state.count;
    // }
  })
  



export default modelApi;