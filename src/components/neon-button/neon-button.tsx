import React from 'react';

interface NeonButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
};

export const NeonButton: React.FC<NeonButtonProps> = ({
  text,
  type,
  onClick,
}) => {
  return (
    <button
      className='neon-button'
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
};
