import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { wrappedFetchData, useFetchData } from './fetchData';

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
          <Bar url='/bar/1'>
            <ErrorBoundary>
              <Suspense fallback={<div>loading...</div>}>
                <Bar url='/bar/1-1' />
              </Suspense>
            </ErrorBoundary>
          </Bar>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Foo({ url, children }) {
  const data = wrappedFetchData(url);
  return (
    <div>
      <div>{data}</div>
      <div style={{ marginLeft: 20 }}>{children}</div>
    </div>
  );
}

function Bar({ url, children }) {
  const { data, init } = useFetchData(url);

  if (init) {
    // wait for useEffect
    return null;
  }

  if (!data) {
    return <div>empty data</div>;
  }

  return (
    <div>
      <div>{data}</div>
      <div style={{ marginLeft: 20 }}>{children}</div>
    </div>
  );
}

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error) => {
    setState(() => {
      throw error;
    });
  };
};

function delayResolve(value, ms) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(value), ms));
}

function delayReject(error, ms) {
  return new Promise((resolve, reject) => setTimeout(() => reject(error), ms));
}
