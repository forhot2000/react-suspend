export const FULFILLED = 'fulfilled';
export const REJECTED = 'rejected';
export const PENDING = 'pending';

export function promiseStatus(promise) {
  if (!promise.status) {
    promise.status = PENDING;
    promise.then(
      (value) => {
        promise.status = FULFILLED;
        promise.value = value;
      },
      (error) => {
        promise.status = REJECTED;
        promise.reason = error;
      }
    );
  }
  return promise;
}
