import React from 'react';

interface GlobalLayoutProps {
  children: React.ReactNode;
};

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
}) => (
  <div className="global-layout">{children}</div>
);
