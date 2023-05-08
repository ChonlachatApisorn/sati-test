import { createContext, useEffect, useState } from 'react';
import { IAuthContext } from '../providers/interface';
import instant from '../providers/axios.instant';
import { AuthUrl } from '../providers/api.constant';

type PropType = {
  children: JSX.Element;
};

export const AuthContext = createContext({} as IAuthContext);
function AuthProvider({ children }: PropType) {
  const [data, setData] = useState({
    _id: '',
    profile_image: '',
    first_name: '',
    last_name: '',
  });
  const [user, setUser] = useState(true);
  const value = { user, setUser, data };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .get(AuthUrl.getUser, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((res) => setData(res.data));
    } else {
      setUser(false);
    }
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
