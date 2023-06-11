import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import Footer from './components/Footer';
import Loader from './components/Loader';

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
    <Footer />
  </React.StrictMode>,
);
