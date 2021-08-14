import { FaGoogle, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import axiosClient from '../../api/axiosClient';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useEffect } from 'react';
import axios from 'axios';

const SocialAuth = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const githubAuth = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        try {
          const res = await axios.post(
            'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
            {
              client_id: 'Iv1.337f8d37602d7dac',
              client_secret: 'a57c9a582cbb02f711550893c221d9d4d46abee4',
              code,
            },
            {
              headers: {
                Accept: 'application/json',
              },
            }
          );

          const response = await axiosClient().post('/auth/github', {
            access_token: res.data.access_token,
          });
          localStorage.setItem('auth_token', response.data.token);
          history.push('/profile');
        } catch (error) {}
      }
    };

    githubAuth();
  }, []);

  const handleOAuthLogin = async (res: any) => {
    try {
      const response = await axiosClient().post('/auth/google', {
        idToken: res.tokenId,
      });
      localStorage.setItem('auth_token', response.data.token);
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = async (res: any) => {
    console.log(res);
    try {
      const response = await axiosClient().post('/auth/facebook', {
        userId: res.userID,
        accessToken: res.accessToken,
      });
      localStorage.setItem('auth_token', response.data.token);
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='icon_wrapper'>
      <GoogleLogin
        clientId='63402635672-t079pc7hs6meuq833oqg2oti6324k5h0.apps.googleusercontent.com'
        onSuccess={handleOAuthLogin}
        onFailure={handleOAuthLogin}
        cookiePolicy='single_host_origin'
        render={({ onClick }) => {
          return (
            <span onClick={onClick}>
              <FaGoogle />
            </span>
          );
        }}
      />
      <FacebookLogin
        appId='370432111134709'
        autoLoad={false}
        callback={handleFacebookLogin}
        render={(props: any) => {
          return (
            <span onClick={props.onClick}>
              <FaFacebook />
            </span>
          );
        }}
      />
      <span>
        <FaTwitter />
      </span>
      {/* <a href='https://github.com/login/oauth/authorize?client_id=Iv1.337f8d37602d7dac&redirect_uri=http://localhost:3000/login'>
        <span>
          <FaGithub />
        </span>
      </a> */}
      <a href='https://github.com/login/oauth/authorize?client_id=Iv1.337f8d37602d7dac&redirect_uri=https://loving-nobel-15448e.netlify.app/login'>
        <span>
          <FaGithub />
        </span>
      </a>
    </div>
  );
};

export default SocialAuth;
