/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";
import defineRoutes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from 'axios';



const api = axios.create({
  baseURL: 'http://192.168.29.10:8000/', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});


function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const routes = defineRoutes();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [showOTPField, setShowOTPField] = useState(false);
  const [showOTPField1, setShowOTPField1] = useState(false);

  const [otp, setOTP] = useState('');
  const [otp1, setOTP1] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobile1, setMobile1] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [isSignInMode, setIsSignInMode] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useState('');


  const storeTokens = async (userId, refreshToken, accessToken) => {
    try {
      await localStorage.setItem('user_id', userId.toString());
      await localStorage.setItem('refresh_token', refreshToken); 
      await localStorage.setItem('access_token', accessToken);
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  };
  



  console.log(token)
  const handleSignUp = async () => {
    if (mobile && firstname && lastname && email) {
      // Prepare the form data for registration
      const formData = new FormData();
      formData.append('phone_number', mobile);
      formData.append('email', ''); // You can add email logic here
      formData.append('first_name', firstname);
      formData.append('last_name', lastname);
      formData.append('type', "Customer");



      try {
        // Send a registration request to your API
        const response = await api.post(`api/user/register/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log(response.data);

        if (response.data.message === 'User Exists but is not active.') {
          // Display OTP input field for verification
          setShowOTPField(true);
        } else if (response.data.message === 'User exists and active.') {
          alert("User exists and active.")
        } else {
          // Registration was successful, you can proceed with further actions
          const { token, details } = response.data;
          const { refresh, access } = token;

          // Store the user ID, refresh, and access tokens in AsyncStorage
          await storeTokens(details.id, refresh, access);
          // Set token in localStorage
         
          // Reset the form fields
          setMobile('');
          setFirstname('');
          setLastname('');
          setEmail('')
          // Proceed with whatever action you need after successful registration
        }
      
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Fill the form correctly');
    }
  };


  const handleOTPSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('phone_number', mobile);
      formData.append('otp_code', otp);

      // Send a POST request to verify OTP
      const response = await api.post(`api/user/verifyotp/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.detail === 'user verified') {
        // User is verified, navigate to the home page
        navigate("/Home")
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  
  const handleSignIn= async () => {

      const formdata = new FormData();
      formdata.append('phone_number',mobile1);
      formdata.append("role" ,"Customer");

      const response = await api.post(`api/user/login-with-otp/`,formdata, {
        headers: { 'Content-Type': 'multipart/form-data', }
      })
        .then((res) => {
          if (res.status == 200) {
            setShowOTPField1(true)
          }
       
        })
        .catch((e) => {
          if(e.response.data.error=='User with this phone number does not exist.'){
            alert('User with this phone number does not exist.');
          }
        });
   
  }

  const handleOTPSubmitLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('phone_number', mobile1);
      formData.append('otp', otp1);
    
      console.log(formData)
      // Send a POST request to verify OTP
      const response = await api.put(`api/user/login-with-otp/`, formData,  {
        headers: { 'Content-Type': 'multipart/form-data', }
      })
      const { token, msg, userId } = response.data; 
        
          if (response.status == 200) {
             
                const { refresh, access } = token;
          
                // Store the user ID, refresh, and access tokens in AsyncStorage
                await storeTokens(userId, refresh, access);
                navigate("/Home")

            } 
         
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleMode = () => {
    // Toggle between Sign In and Sign Up modes
    setIsSignInMode(!isSignInMode);
    // Reset the OTP field when switching modes
    setShowOTPField(false);
    setShowOTPField1(false);

    // Reset other form fields as needed
    setMobile('');
    setOTP('');
    setOTP1('')
    setMobile1('')
    setFirstname('');
    setLastname('');
  };


  return (
    <>
      <DefaultNavbar
        routes={routes}
        
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                {isSignInMode ? "Sign in" : "Sign up"}
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              
              <MKBox pt={4} pb={3} px={3}>
             
                <MKBox component="form" role="form">
                <>
  {isSignInMode ? (
    <>
      {!showOTPField1 ? (
        <MKBox mb={2}>
          <MKInput
            type="mobile"
            label="Mobile"
            fullWidth
            value={mobile1}
            onChange={(e) => setMobile1(e.target.value)}
          />
        </MKBox>
      ) : null}
      {showOTPField1 ? (
        <MKBox mb={2}>
          <MKInput
            type="text"
            label="OTP"
            fullWidth
            value={otp1}
            maxLength={4}
            onChange={(e) => setOTP1(e.target.value)}
          />
        </MKBox>
      ) : null}
      <MKBox mt={4} mb={1}>
        <MKButton variant="gradient" color="info" fullWidth  onClick={showOTPField1 ? handleOTPSubmitLogin : handleSignIn}>
          {showOTPField1 ? 'Send OTP' : 'Sign in'}
        </MKButton>
      </MKBox>
      
      <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
    </>
  ) : (
    <>
      {!showOTPField ? (
        <>
          <MKBox mb={2}>
            <MKInput type="mobile" label="Mobile" fullWidth 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)} />
          </MKBox>
         
          <MKBox mb={2}>
            <MKInput type="email" label="Email" fullWidth      value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput type="fistname" label="FirstName" fullWidth  value={firstname}
            onChange={(e) => setFirstname(e.target.value)} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput type="lastname" label="LastName" fullWidth   value={lastname}
            onChange={(e) => setLastname(e.target.value)} />
          </MKBox>
        </>
      ) : null}
      {showOTPField ? (
        <MKBox mb={2}>
          <MKInput
            type="text"
            label="OTP"
            fullWidth
            maxLength={4}
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </MKBox>
      ) : null}
      <MKBox mt={4} mb={1}>
        <MKButton variant="gradient" color="info" fullWidth onClick={showOTPField ? handleOTPSubmit : handleSignUp}>
          {showOTPField ? 'Send OTP' : 'Sign Up'}
        </MKButton>
      </MKBox>
      
    </>
  )}
</>
                  {/* <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth>
                    {isSignInMode ? "Sign in" : "Sign up"}
                    </MKButton>
                  </MKBox> */}
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                    {isSignInMode ? "Don't have an account?" : "Already have an account?"}{" "}
                      <MKTypography
                        //  component={Link}
                        //  to={isSignInMode ? "/authentication/sign-up" : "/authentication/sign-in"}
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        
                       <span
          onClick={toggleMode}
          style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          {isSignInMode ? "Sign up" : "Sign in"}
        </span>
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
