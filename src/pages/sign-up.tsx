import React from 'react';
import { useRouter } from 'next/router';
import { LogInLayout } from '../layouts/log-in-layout';
const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = (user: string, password: string) => {
    localStorage.setItem('user', user);
    localStorage.setItem('password', password);
    router.push('/log-in');
  };

  return (
    <LogInLayout
      buttonText='Sign up'
      url='/log-in'
      submitForm={handleSubmit}
    />
  )
};

export default SignInPage;
