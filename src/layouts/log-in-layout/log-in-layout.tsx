import { GlobalLayout } from "../global-layout";

interface LogInLayoutProps {
  children: React.ReactNode
};

export const LogInLayout: React.FC<LogInLayoutProps> = ({
  children,
}) => (
  <GlobalLayout>
    <div className="log-in-layout">{children}</div>
  </GlobalLayout>
);
