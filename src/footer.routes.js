// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/user.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Arl-Tech",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      // link: "https://www.facebook.com/CreativeTim/",
    },
    {
      icon: <TwitterIcon />,
      // link: "https://twitter.com/creativetim",
    },
    {
      icon: <GitHubIcon />,
      // link: "https://github.com/creativetimofficial",
    },
    {
      icon: <YouTubeIcon />,
      // link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "#" },
        { name: "premium membership", href: "#" },
        { name: "blog", href: "#" },
        { name: "products", href: "#" },
        { name: "services", href: "#" },
        { name: "rentals", href: "#" },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "#" },
        { name: "about us", href: "#" },
        { name: "helpline no - 1234567890", href: "#" },
      ],
    },
    {
      name: "reach us at",
      items: [
        { name: "Plot No. A/108, 2nd floor, Banadev Bhawan, Meghdoot St, Bhubaneswar, Odisha 751007", href: "#" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "#" },
        { name: "privacy policy", href: "#" },
        { name: "Refund Policy", href: "#" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved | Copyright &copy; {date} | Website by{" "}
      <MKTypography
        component="a"
        href="#"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Arl-Tech Developer Team
      </MKTypography>
      .
    </MKTypography>
  ),
};
