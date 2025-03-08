import { useGoogleLogin } from '@react-oauth/google';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const GoogleLoginButton = () => {
  // const { login } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/auth/google`);
        window.location.href = data;
      } catch (error) {
        console.error('Google login error', error);
      }
    },
    onError: () => console.error('Login Failed'),
  });

  return (
    <button onClick={() => googleLogin()}>Continue with Google</button>
  );
};

export default GoogleLoginButton;
