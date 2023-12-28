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
  return use(promise);
}
