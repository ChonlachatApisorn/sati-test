import { Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/signin';
import SignUp from './components/sign-up/signup';
import Homepage from './components/homepage/homepage';
import CreatePostForm from './components/createpost';
import ProfilePage from './components/profile';
import UpdateProfilePage from './components/update-profile';
import { useContext } from 'react';
import { AuthContext } from './contexts/auth.context';

export function Router() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="*" element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Homepage />} />
          <Route path="create-post" element={<CreatePostForm />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="update-profile" element={<UpdateProfilePage />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
