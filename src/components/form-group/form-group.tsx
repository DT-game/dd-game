import React from 'react';
import { FormField } from '../form-field';
import { NeonButton } from '../neon-button';

export const FormGroup = () => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('submit: ', user, password);
  };

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
    }
  };

  return (
    <div className='form-group'>
      <div className='form-group__title-container'>
        <h1 className='form-group__title'>Deloitte<br/> Digital</h1>
        <h2 className='form-group__subtitle'>game</h2>
      </div>
      <form onSubmit={handleSubmit} className='form-group__container'>
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
        <NeonButton
          type='submit'
          text='Submit'
        />
      </form>
    </div>
  )
};
