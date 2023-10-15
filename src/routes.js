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

/** 
  All of the routes for the Material Kit 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";

// Sections
import PageHeaders from "layouts/sections/page-sections/page-headers";
import Features from "layouts/sections/page-sections/featuers";
import Navbars from "layouts/sections/navigation/navbars";
import NavTabs from "layouts/sections/navigation/nav-tabs";
import Pagination from "layouts/sections/navigation/pagination";
import Inputs from "layouts/sections/input-areas/inputs";
import Forms from "layouts/sections/input-areas/forms";
import Alerts from "layouts/sections/attention-catchers/alerts";
import Modals from "layouts/sections/attention-catchers/modals";
import TooltipsPopovers from "layouts/sections/attention-catchers/tooltips-popovers";
import Avatars from "layouts/sections/elements/avatars";
import Badges from "layouts/sections/elements/badges";
import BreadcrumbsEl from "layouts/sections/elements/breadcrumbs";
import Buttons from "layouts/sections/elements/buttons";
import Dropdowns from "layouts/sections/elements/dropdowns";
import ProgressBars from "layouts/sections/elements/progress-bars";
import Toggles from "layouts/sections/elements/toggles";
import Typography from "layouts/sections/elements/typography";
import React,{useState,useEffect} from "react"


import axios from 'axios';



const api = axios.create({
  baseURL: 'http://192.168.29.50:8000/', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

async function fetchChildData(productId) {
  try {
    const childResponse = await api.get(`api/product/api/children/${productId}/`);
    return childResponse.data;
  } catch (error) {
    console.error('Error fetching child data:', error);
    throw error;
  }
}

export default function defineRoutes() {
  const [data, setData] = useState([]);
  const [productRoutes, setProductRoutes] = useState([]);
  const [loading, setLoading] = useState(true);


  
  const fetchData = async () => {
    try {
      const productResponse = await api.get("api/product/products/");
      setData(productResponse.data);
      setLoading(false);
  
      // Define routes as an array of objects
        const routes = await Promise.all(
      productResponse.data.map(async (product) => {
        const childResponse = await api.get(`api/product/api/children/${product.id}/`);
        const childData = childResponse.data;

        return {
          image: <img src={product.image} alt={product.name} />,
          name: product.name,
          description: `See all sections  ${product.name}`,
          dropdown: true,
          collapse: [
            ...childData.map((child) => ({
              name: child.name,
              image: <img src={child.image} alt={child.name} />,
              route: `/sections/${product.name.toLowerCase()}/${child.name.toLowerCase()}`,
              component: <AboutUs />, // You can change this component as needed
            })),
          ],
        };
      })
    );

  
      setProductRoutes(routes);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  


  console.log("jdfjadfdjdasfjk", productRoutes);

  return [
    {
    name: "Products",
    
    icon: <Icon>view_day</Icon>,
    collapse: [...productRoutes  ]
    },  // Ensure productRoutes is an array before spreading
    {
      name: "services",
      icon: <Icon>dashboard</Icon>,
      columns: 1,
      rowsPerColumn: 2,
      collapse: [
        // {
        //   name: "landing pages",
        //   collapse: [
        //     {
        //       name: "about us",
        //       route: "/pages/landing-pages/about-us",
        //       component: <AboutUs />,
        //     },
        //     {
        //       name: "contact us",
        //       route: "/pages/landing-pages/contact-us",
        //       component: <ContactUs />,
        //     },
        //     {
        //       name: "author",
        //       route: "/pages/landing-pages/author",
        //       component: <Author />,
        //     },
        //   ],
        // },
        // {
        //   name: "account",
        //   collapse: [
        //     {
        //       name: "sign in",
        //       route: "/pages/authentication/sign-in",
        //       component: <SignIn />,
        //     },
        //   ],
        // },
      ],
    },
    {
      name: "Rentals",
      icon: <Icon>article</Icon>,
       collapse: [
      //   {
      //     name: "getting started",
      //     description: "All about overview, quick start, license and contents",
      //     href:
      //       "https://www.creative-tim.com/learning-lab/react/quick-start/material-kit/",
      //   },
      //   {
      //     name: "foundation",
      //     description: "See our colors, icons and typography",
      //     href: "https://www.creative-tim.com/learning-lab/react/colors/material-kit/",
      //   },
      //   {
      //     name: "components",
      //     description: "Explore our collection of fully designed components",
      //     href: "https://www.creative-tim.com/learning-lab/react/alerts/material-kit/",
      //   },
      //   {
      //     name: "plugins",
      //     description: "Check how you can integrate our plugins",
      //     href: "https://www.creative-tim.com/learning-lab/react/datepicker/material-kit/",
      //   },
     ],
    },
  ];
}