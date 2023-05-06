import { Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/signin';

export function Router() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default Router;
