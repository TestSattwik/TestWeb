/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
import defineRoutes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg.png";
import React, { useState, useEffect } from 'react';


function Presentation() {
  const [token, setToken] = useState(null);
  const userId = localStorage.getItem('user_id');
  console.log(userId)

  useEffect(() => {
    // Check if the token exists in local storage or any other authentication mechanism
    const userToken = localStorage.getItem('access_token');
    if (userToken) {
      // If the token exists, set it in the state
      setToken(userToken);
    }
  }, []);

  const handleLogOut = () => {
    // Handle the logic to log the user out, remove the token, etc.
    localStorage.removeItem('access_token');
    setToken(null);
  };



  const routes = defineRoutes();
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={
          token ? (
            {
              type: "internal",
              route: '/presentation', // You can define a logout route
              label: "Log Out",
              color: "yellow",
             
            }
          ) : (
            {
              type: "external",
              route: '/auth',
              label: "Log In",
              color: "yellow",
            }
          )
        }
        sticky
        onClick={handleLogOut}
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Arl-Tech{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              All
REAL-ESTATE
LOGISTICS &amp; Get hassle free delivery from the comfort of your home.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <Information />
        <DesignBlocks />
        <Pages />
        {/* <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>  */}
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                variant="gradient"
                color="warning"
                icon="flag"
                title="Our Values"
                description="At Arl-Tech, we believe in honesty, integrity, and hard work. We treat our clients with respect and strive to exceed their expectations. We are committed to delivering high-quality workmanship and exceptional customer service."
                // action={{
                //   type: "external",
                //   route: "#",
                //   label: "Let's start",
                // }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="warning"
                icon="precision_manufacturing"
                title="Our Expertise"
                description="Our team at SattwikTest has over 30 years of combined experience in the construction industry. We have the expertise to handle any project, from small renovations to large commercial builds. We are constantly learning and staying up-to-date with the latest construction techniques and technology."
                // action={{
                //   type: "external",
                //   route: "#",
                //   label: "Read more",
                // }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="warning"
                icon="apps"
                title="Our Process"
                description="At Arl-Tech, we believe in transparency and communication. We work closely with our clients to ensure that their vision is brought to life. We provide regular updates throughout the project and are always available to answer any questions."
                // action={{
                //   type: "external",
                //   route: "#",
                //   label: "Read more",
                // }}
              />
            </Grid>
          </Grid>
        </Container>
        <Testimonials />
        <Download />
        <MKBox pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                Arl-Tech 
                </MKTypography>
                <MKTypography variant="body1" color="text">
                Privacy Policy | Refund Policy | Terms and Conditions
                </MKTypography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                my={{ xs: 5, lg: "auto" }}
                mr={{ xs: 0, lg: "auto" }}
                sx={{ textAlign: { xs: "center", lg: "right" } }}
              >
                <MKSocialButton
                  component="a"
                  href="#"
                  target="_blank"
                  color="twitter"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-twitter" />
                  &nbsp;Tweet
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="#"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;Share
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="#"
                  target="_blank"
                  color="pinterest"
                >
                  <i className="fab fa-pinterest" />
                  &nbsp;Pin it
                </MKSocialButton>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
