interface GlobalLayoutProps {
  children: React.ReactNode;
};

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
}) => (
  <div>{children}</div>
);
