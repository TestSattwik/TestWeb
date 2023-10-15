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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/front.png";
import bgBack from "assets/images/back.jpg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Welcome to
                    <br />
                    Arl-Tech
                  </>
                }
                description="Your One-Stop Solution for Building, Construction, and Order Tracking Needs"
              />
              <RotatingCardBack
                image={bgBack}
                title="Discover More"
                description="ARL-TECH believes that success comes in the form of Collaboration."
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "Explore Arl-Tech",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Why Choose Arl-Tech? Our Services"
                  description="From Building Materials to Rental Equipment - We've Got You Covered. Experience Unmatched Quality, Reliability, and Customer Satisfaction."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Quality"
                  description="At Arl-Tech, we believe that quality is the foundation of every successful project. We are committed to delivering the highest standards of quality in every product, service, and rental equipment we offer. "
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Quantity"
                  description="Arl-Tech understands the importance of having the right quantity of materials and equipment for your projects. We offer a vast selection of products and equipment in various quantities to meet the specific needs of your construction projects, large or small. "
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Time"
                  description="Time is of the essence in the construction and building industry, and Arl-Tech recognizes the importance of meeting deadlines."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
