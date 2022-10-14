import React from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GlobalLayout } from '../layouts/global-layout'

const Home: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const authCheck = () => {
      if (!localStorage.getItem('user')) {
        router.push('/log-in');
      };
    };

    authCheck();
  });

  return (
    <GlobalLayout>
      <div>Homepage</div>
    </GlobalLayout>
  )
}

export default Home
