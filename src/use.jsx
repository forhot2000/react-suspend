import { FULFILLED, REJECTED, PENDING } from './promise';

export function use(promise) {
  if (promise.status === FULFILLED) {
    return promise.value;
  } else if (promise.status === REJECTED) {
    throw promise.reason;
  } else if (promise.status === PENDING) {
    throw promise;
  } else {
    promise.status = PENDING;
    promise.then(
      (result) => {
        promise.status = FULFILLED;
        promise.value = result;
      },
      (reason) => {
        promise.status = REJECTED;
        promise.reason = reason;
      }
    );
    throw promise;
  }
}
