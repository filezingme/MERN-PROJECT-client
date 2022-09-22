import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingLayout from './components/layouts/LandingLayout'
import AuthView from './views/AuthView'
import DashboardView from './views/DashboardView'
import AuthContextProvider from './contexts/authContext'
import PrivateRoute from './components/routing/PrivateRoute';
import AboutView from './views/AboutView';
import PostContextProvider from './contexts/postContext';


function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>

            <Route path="/" element={<LandingLayout />} /> {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            
            <Route 
              path="/login" 
              element={<AuthView authRoute='login'  />}
              exact />
            
            <Route 
              path="/register" 
              element={<AuthView authRoute='register'  />}
              exact />

            <Route path="/dashboard" element={<PrivateRoute element={DashboardView} />} />
            <Route path="/about" element={<PrivateRoute element={AboutView} />} />

          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>    
  );
}

export default App;
