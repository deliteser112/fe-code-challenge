import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';

const SymbolsView = React.lazy(() => import('@/components/SymbolsView'));
const ProfileView = React.lazy(() => import('@/components/ProfileView'));
const StatementsView = React.lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '50px', display: 'flex' }}>
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
