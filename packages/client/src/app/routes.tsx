import { Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/signin';
import SignUp from './components/sign-up/signup';
import Homepage from './components/homepage/homepage';
import CreatePostForm from './components/homepage/Blog/create-blog';
import ProfilePage from './components/profile';
import UpdateProfilePage from './components/update-profile';
import { useContext } from 'react';
import { AuthContext } from './contexts/auth.context';
import { UpdateBlogPage } from './components/homepage/Blog/update-blog';
import ChangePassword from './components/change-password';

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
          <Route path="profile/:user_id" element={<ProfilePage />} />
          <Route
            path="update-profile/:user_id"
            element={<UpdateProfilePage />}
          />
          <Route path="change-password/:user_id" element={<ChangePassword />} />
          <Route path="update-blog/:blog_id" element={<UpdateBlogPage />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
