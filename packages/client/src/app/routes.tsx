import { Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/signin';
import SignUp from './components/sign-up/signup';
import Homepage from './components/homepage/homepage';
import CreatePostForm from './components/createpost';
import ProfilePage from './components/profile';

export function Router() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="homepage" element={<Homepage />} />
      <Route path="create-post" element={<CreatePostForm />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default Router;
