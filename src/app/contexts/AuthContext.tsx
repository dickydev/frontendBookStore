import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  const checkAuthentication = (): boolean => {
    const isLoggedIn =
      !!localStorage.getItem("name") && !!localStorage.getItem("email");
    return isLoggedIn;
  };

  useEffect(() => {
    const isLoggedIn = checkAuthentication();
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
