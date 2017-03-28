import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';

export default function fetchDetails(action$, { dispatch }) {
  return action$.ofType('FETCH_DETAILS')
    .mergeMap((action) => {
      dispatch({ type: 'START_LOADING' });
      return (
        ajax.getJSON(`/api/list?torrentId=${window.btoa(action.payload)}&timestamp=${new Date().getTime()}`, {
          withCredentials: true,
        })
          .retry(3)
          .timeout(6000)
          .switchMap(payload => (
            [{
              type: 'SET_DETAILS',
              payload,
            }, {
              type: 'STOP_LOADING',
            }]
          ))
          .catch(() => (Observable.of({
            type: 'STOP_LOADING',
          })))
      );
    });
}
