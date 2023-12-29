import { useEffect, useRef, useState } from 'react';
import { FULFILLED, PENDING, REJECTED, promiseStatus } from './promise';
import { use } from './use';

const cache = new Map();

export function fetchData(url) {
  let promise;
  if (cache.has(url)) {
    promise = cache.get(url);
  } else {
    promise = new Promise((resolve, reject) => {
      if (url.endsWith('?error')) {
        setTimeout(() => reject(new Error('bad')), 2000);
      } else {
        setTimeout(() => resolve(url), 1000);
      }
    });
    cache.set(url, promise);
  }
  return promise;
}

export function wrappedFetchData(url) {
  return use(fetchData(url));
}

export function useFetchData(url) {
  const ref = useRef({ first: true });
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    ref.current.first = false;
    const promise = promiseStatus(fetchData(url));
    switch (promise.status) {
      case REJECTED:
        setError(promise.reason);
        break;
      case FULFILLED:
        setData(promise.value);
        break;
      case PENDING:
        promise.then(
          (value) => {
            setData(value);
            setError(null);
          },
          (error) => {
            setError(error);
          }
        );
        // don't throw promise in setData when useEffect
        setError(promise);
        break;
    }
  }, []);

  if (error) {
    // component will not be unmounted
    throw error;
  }

  return { data, init: ref.current.first };
}
