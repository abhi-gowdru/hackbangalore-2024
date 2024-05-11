// withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import auth from "@/backend/db_config";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        }
      });

      return () => unsubscribe();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
