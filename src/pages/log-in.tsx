import React from 'react';
import { useRouter } from 'next/router';
import { LogInLayout } from "../layouts/log-in-layout";

const LoginPage = () => {

  const router = useRouter();

  const handleSubmit = (user: string, password: string) => {
    localStorage.setItem('user', user);
    localStorage.setItem('password', password);
    router.push('/');
  };

  return (
    <LogInLayout
      buttonText='Log in'
      url='/sign-up'
      text
      submitForm={handleSubmit}
    />
  )
};

export default LoginPage;
