import React from 'react';

export interface FormFieldProps {
  value: string;
  id: string;
  type: string;
  inputLabel?: string;
  onChange: (value: string, id: string) => void;
};

export const FormField: React.FC<FormFieldProps> = ({
  value,
  id,
  inputLabel = undefined,
  type,
  onChange,
}) => {
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(prevState => !prevState);
  };

  const handleChange = (event: any) => {
    onChange(event.target.value, id);
  };

  const clearInput = () => {
    onChange('', id);
  };

  return (
    <>
      <div className='form-field'>
        <label className='form-field__label' htmlFor={id}>{inputLabel}</label>
        <input
          className='form-field__input'
          id={id}
          type={type === "password" && !passwordShown ? "password" : "text"}
          value={value}
          onChange={handleChange}
        />

        {value.length > 0 &&
          <div className='form-field__icons'>
            <span className="form-field__delete-text-icon" onClick={clearInput}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.666504 9.00008C0.666504 4.40008 4.39984 0.666748 8.99984 0.666748C13.5998 0.666748 17.3332 4.40008 17.3332 9.00008C17.3332 13.6001 13.5998 17.3334 8.99984 17.3334C4.39984 17.3334 0.666504 13.6001 0.666504 9.00008ZM10.1262 9.00008L12.7498 6.37647L11.6234 5.25008L8.99984 7.87369L6.37623 5.25008L5.24984 6.37647L7.87345 9.00008L5.24984 11.6237L6.37623 12.7501L8.99984 10.1265L11.6234 12.7501L12.7498 11.6237L10.1262 9.00008Z" fill="#5E6C84" />
              </svg>
            </span>
            {type === 'password' && (
              !passwordShown ? (
                <span className="form-field__password-icon form-field__password-icon--opened" onClick={togglePasswordVisibility}>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99992 0.75C5.83325 0.75 2.27492 3.34167 0.833252 7C2.27492 10.6583 5.83325 13.25 9.99992 13.25C14.1666 13.25 17.7249 10.6583 19.1666 7C17.7249 3.34167 14.1666 0.75 9.99992 0.75ZM9.99992 11.1667C7.69992 11.1667 5.83325 9.3 5.83325 7C5.83325 4.7 7.69992 2.83333 9.99992 2.83333C12.2999 2.83333 14.1666 4.7 14.1666 7C14.1666 9.3 12.2999 11.1667 9.99992 11.1667ZM9.99992 4.5C8.61658 4.5 7.49992 5.61667 7.49992 7C7.49992 8.38333 8.61658 9.5 9.99992 9.5C11.3833 9.5 12.4999 8.38333 12.4999 7C12.4999 5.61667 11.3833 4.5 9.99992 4.5Z" fill="#2B3851" />
                  </svg>
                </span>
              ) : (
                <span className="form-field__password-icon form-field__password-icon--closed" onClick={togglePasswordVisibility}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.44168 6.32964C3.25542 5.80971 2.68294 5.53922 2.16301 5.72549C1.64308 5.91175 1.3726 6.48423 1.55886 7.00416C2.17625 8.72748 3.23253 10.2326 4.58849 11.3388L3.13668 13.8534C2.86053 14.3317 3.02441 14.9433 3.5027 15.2194C3.98099 15.4956 4.59259 15.3317 4.86873 14.8534L6.27111 12.4244C7.11985 12.8442 8.04104 13.1263 9.01245 13.2419V15.3059C9.01245 15.8582 9.46017 16.3059 10.0125 16.3059C10.5647 16.3059 11.0125 15.8582 11.0125 15.3059V13.2419C11.9839 13.1263 12.905 12.8442 13.7538 12.4244L15.1562 14.8534C15.4323 15.3317 16.0439 15.4956 16.5222 15.2194C17.0005 14.9433 17.1644 14.3317 16.8882 13.8534L15.4364 11.3388C16.7924 10.2326 17.8487 8.72749 18.466 7.00416C18.6523 6.48423 18.3818 5.91175 17.8619 5.72549C17.342 5.53922 16.7695 5.80971 16.5832 6.32964C15.522 9.29181 12.9427 11.301 10.0125 11.301C7.0822 11.301 4.50289 9.29181 3.44168 6.32964Z" fill="#42526E" />
                  </svg>
                </span>
              )
            )}
          </div>
        }
      </div>
    </>
  );
};
