import { Navbar } from './components/navbar';
import AuthProvider from './contexts/auth.context';
import Router from './routes';

export function App() {
  return (
    <AuthProvider>
      <Navbar>
        <Router />
      </Navbar>
    </AuthProvider>
  );
}

export default App;
