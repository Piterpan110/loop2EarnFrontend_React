import './App.css';

//import react from 'react';
import react, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import SignupPage from './scene/signup';
import LogInPage from './scene/login';
import DashboardPage from './scene/dashboard';

function App() {
  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  return (
    <Router>
      <WrappedApp globalVar={globalVar} setGlobalVar={setGlobalVar} />
    </Router>
  );
}

function WrappedApp({ globalVar, setGlobalVar }) {
  const navigation = useNavigate();
  react.useEffect(() => {
    const accesstoken = localStorage.getItem('accesstoken');
    if (accesstoken) {
      console.log('refresh accesstoken: ', accesstoken);
      console.log('globalVar--- ', globalVar);
      if (globalVar === 'Signup') {
        navigation('/signup');
        console.log('refresh-signup!');
      }
      console.log('refresh!');
    }
  }, [globalVar]);
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
