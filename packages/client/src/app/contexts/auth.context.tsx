import { createContext, useEffect, useState } from 'react';
import { IAuthContext } from '../providers/interface';
import instant from '../providers/axios.instant';
import { AuthUrl } from '../providers/api.constant';

type PropType = {
  children: JSX.Element;
};

export const AuthContext = createContext({} as IAuthContext);
function AuthProvider({ children }: PropType) {
  const [user, setUser] = useState(true);
  const value = { user, setUser };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      instant.get(AuthUrl.getUser, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
    } else {
      setUser(false);
    }
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
