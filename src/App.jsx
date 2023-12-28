import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { fetchData } from './fetchData';

export function App() {
  return (
    <div>
      <h2>Welcome</h2>

      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Foo url='/foo'>
            <ErrorBoundary>
              <Suspense fallback={<div>loading...</div>}>
                <Foo url='/foo/1?error' />
              </Suspense>
            </ErrorBoundary>
          </Foo>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Foo url='/bar'>
            <ErrorBoundary>
              <Suspense fallback={<div>loading...</div>}>
                <Foo url='/bar/1' />
              </Suspense>
            </ErrorBoundary>
          </Foo>
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
