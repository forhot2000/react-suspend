import React, { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { fetchData } from './fetchData';

export function App() {
  return (
    <div>
      <h2>Welcome</h2>

      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Foo url='/foo/1'>
            <ErrorBoundary>
              <Suspense fallback={<div>loading...</div>}>
                <Foo url='/foo/1-1?error' />
              </Suspense>
            </ErrorBoundary>
          </Foo>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Foo url='/foo/2'>
            <ErrorBoundary>
              <Suspense fallback={<div>loading...</div>}>
                <Foo url='/foo/2-1' />
              </Suspense>
            </ErrorBoundary>
          </Foo>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Bar />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Foo({ url, children }) {
  const data = fetchData(url);
  return (
    <div>
      <div>{data}</div>
      <div style={{ marginLeft: 20 }}>{children}</div>
    </div>
  );
}

function Bar() {
  const throwAsyncError = useThrowAsyncError();
  useEffect(() => {
    const promise = delayReject(new Error('xxx'), 1000);
    promise.catch(throwAsyncError);
  }, []);
  return <div>bar</div>;
}

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error) => {
    setState(() => {
      throw error;
    });
  };
};

function delayReject(error, ms) {
  return new Promise((resolve, reject) => setTimeout(() => reject(error), ms));
}
