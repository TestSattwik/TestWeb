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

import sand from "assets/images/sand.jpg";
import cement from "assets/images/cement.jpg";
import crusher from "assets/images/crusher.jpg";
import steel from "assets/images/steel.jpg";
import brick from "assets/images/brick.jpg";
import mixture from "assets/images/mixture.jpg";
import borewell from "assets/images/borewell.jpg";
import jcb from "assets/images/jcb.jpg";
import pestcontrol from "assets/images/pestcontrol.jpg";

const imagesPrefix =
  "assets/images";

export default [
  {
    title: "Products",
    description: "We source and provide only top-quality construction materials and products from trusted suppliers to ensure the durability and longevity of your projects.",
    items: [
      {
        image: `${sand}`,
        name: "Sand",
        // count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${cement}`,
        name: "Cement",
        // count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${crusher}`,
        name: "Crusher Metal",
        // count: 8,
        // pro: true,
      },
      {
        image: `${steel}`,
        name: "Steel",
        // count: 1,
        // pro: true,
      },
      {
        image: `${brick}`,
        name: "Bricks",
        // count: 11,
        // pro: true,
      },
    ],
  },
  {
    title: "Services",
    description: "Our team of experienced professionals is dedicated to delivering exceptional service, from expert consultations to timely deliveries.",
    items: [
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
  },
  {
    title: "Rentals",
    description: "Our rental equipment is well-maintained and regularly inspected to ensure it meets safety and performance standards, providing you with reliable tools for your projects.",
    items: [
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
    ],
  },
  // {
  //   title: "Attention Catchers",
  //   description: "20+ Fully coded components that popup from different places of the screen",
  //   items: [
  //     {
  //       image: `${imagesPrefix}/alerts.jpg`,
  //       name: "Alerts",
  //       count: 4,
  //       route: "/sections/attention-catchers/alerts",
  //     },
  //     {
  //       image: `${imagesPrefix}/toasts.jpg`,
  //       name: "Notifications",
  //       count: 3,
  //       pro: true,
  //     },
  //     {
  //       image: `${imagesPrefix}/popovers.jpg`,
  //       name: "Tooltips & Popovers",
  //       count: 2,
  //       route: "/sections/attention-catchers/tooltips-popovers",
  //     },
  //     {
  //       image: `${imagesPrefix}/modals.jpg`,
  //       name: "Modals",
  //       count: 5,
  //       route: "/sections/attention-catchers/modals",
  //     },
  //   ],
  // },
  // {
  //   title: "Elements",
  //   description: "80+ carefully crafted small elements that come with multiple colors and shapes",
  //   items: [
  //     {
  //       image: `${imagesPrefix}/buttons.jpg`,
  //       name: "Buttons",
  //       count: 6,
  //       route: "/sections/elements/buttons",
  //     },
  //     {
  //       image: `${imagesPrefix}/avatars.jpg`,
  //       name: "Avatars",
  //       count: 2,
  //       route: "/sections/elements/avatars",
  //     },
  //     {
  //       image: `${imagesPrefix}/dropdowns.jpg`,
  //       name: "Dropdowns",
  //       count: 2,
  //       route: "/sections/elements/dropdowns",
  //     },
  //     {
  //       image: `${imagesPrefix}/switch.jpg`,
  //       name: "Toggles",
  //       count: 2,
  //       route: "/sections/elements/toggles",
  //     },
  //     {
  //       image: `${imagesPrefix}/social-buttons.jpg`,
  //       name: "Social Buttons",
  //       count: 2,
  //       pro: true,
  //     },
  //     {
  //       image: `${imagesPrefix}/breadcrumbs.jpg`,
  //       name: "Breadcrumbs",
  //       count: 1,
  //       route: "/sections/elements/breadcrumbs",
  //     },
  //     {
  //       image: `${imagesPrefix}/badges.jpg`,
  //       name: "Badges",
  //       count: 3,
  //       route: "/sections/elements/badges",
  //     },
  //     {
  //       image: `${imagesPrefix}/progress.jpg`,
  //       name: "Progress Bars",
  //       count: 4,
  //       route: "/sections/elements/progress-bars",
  //     },
  //     {
  //       image: `${imagesPrefix}/tables.jpg`,
  //       name: "Tables",
  //       count: 3,
  //       pro: true,
  //     },
  //     {
  //       image: `${imagesPrefix}/typography.jpg`,
  //       name: "Typography",
  //       count: 2,
  //       route: "/sections/elements/typography",
  //     },
  //   ],
  // },
];
