import Link from 'next/link';
import React from 'react';
import { FormField, Logo, NeonButton } from '../../components';
import { GlobalLayout } from "../global-layout";

interface LogInLayoutProps {
  buttonText: string;
  url: string;
  text?: boolean; 
  submitForm: (user: string, password: string) => void;
};

export const LogInLayout: React.FC<LogInLayoutProps> = ({
  buttonText,
  url,
  text = false,
  submitForm,
}) => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = (value: string, id: string) => {
    switch (id) {
      case 'user':
        setUser(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
    };
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    submitForm(user, password);
  };

  return(
    <GlobalLayout>
      <div className="log-in-layout">
        <div className="log-in-layout__wrapper">
          <Logo />
          <form onSubmit={handleSubmit} className='log-in-layout__container'>
            <FormField
              value={user}
              id='user'
              inputLabel='User name'
              type='text'
              onChange={onChange}
            />
            <FormField
              value={password}
              id='password'
              inputLabel='Password'
              type='password'
              onChange={onChange}
            />
            {text ? (
              <p className='log-in-layout__container__text'>
                Pokud nejsi ještě registrovaný klini <Link className='log-in-layout__container__text__link' href={url}>zde.</Link>
              </p>
            ) : (
              ''
            )}
            <NeonButton
              type='submit'
              text={buttonText}
            />
          </form>
        </div>
      </div>
    </GlobalLayout>
  );
};
