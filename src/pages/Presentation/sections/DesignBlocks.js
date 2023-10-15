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

// react-router-dom components
import { Link } from "react-router-dom";
import React,{useState,useEffect} from "react"
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
import ExampleCard from "pages/Presentation/components/ExampleCard";

// Data
// import data from "pages/Presentation/sections/data/designBlocksData";

import axios from 'axios';

import mixture from "assets/images/mixture.jpg";
import borewell from "assets/images/borewell.jpg";
import jcb from "assets/images/jcb.jpg";
import pestcontrol from "assets/images/pestcontrol.jpg";

const api = axios.create({
  baseURL: 'http://192.168.29.50:8000/', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

function DesignBlocks() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get('/api/product/products/');
        // const rentalResponse = await api.get('/api/product/rentals/');
        // const serviceResponse = await api.get('/api/product/services/');

        const combinedData = [
          { title: "Products", items: productResponse.data, description: "We source and provide only top-quality construction materials and products from trusted suppliers to ensure the durability and longevity of your projects.", },
          { title: "Rentals", items:  [
            {
              image: `${pestcontrol}`,
              name: "Pest Control",
              // count: 4,
              route: "/sections/navigation/navbars",
            },
            {
              image: `${borewell}`,
              name: "Bore Well",
              // count: 2,
              route: "/sections/navigation/nav-tabs",
            },
          ],
         description: "We source and provide only top-quality construction materials and products from trusted suppliers to ensure the durability and longevity of your projects." },
          { title: "Services",items: [
            {
              image: `${jcb}`,
              name: "Excavator",
              // count: 6,
              // pro: true,
            },
            {
              image: `${mixture}`,
              name: "Mixture Machine",
              // count: 8,
              // pro: true,
            },
          ],description: "We source and provide only top-quality construction materials and products from trusted suppliers to ensure the durability and longevity of your projects.", },
        ];
        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };

    fetchData();
  }, []);

  const renderData = data.map(({ title, description, items }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={title}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1}>
            {title}
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            {description}
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {items.map(({ image, name, count, route, pro }) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={name}>
              <Link to={pro ? "/" : route}>
                <ExampleCard image={image} name={name} count={count} pro={pro} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="yellow"
            badgeContent="Order Your Material Now"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Huge collection of Products, Services, or Rentals
          </MKTypography>
          <MKTypography variant="body1" color="text">
             You can rely on us to provide the highest quality products, the right quantity, and timely solutions to meet your project goals and deadlines.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default DesignBlocks;
