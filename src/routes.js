
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
import ProductDetail from "./ProductDetail";

import React,{useState,useEffect} from "react"


import axios from 'axios';



const api = axios.create({
  baseURL: 'http://192.168.123.92:8000/', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});




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
            description: `See all sections ${product.name}`,
            dropdown: true,
            collapse: [
              ...childData.map((child) => ({
                name: child.name,
                image: <img src={child.image} alt={child.name} />,
                route: `/products/${product.name.toLowerCase()}/${child.name.toLowerCase()}`,
                component: <ProductDetail childName={child.name} childImage={child.image} />, // Pass child data as props
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