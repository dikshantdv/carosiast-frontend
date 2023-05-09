import { Box, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
// import logo from '../../assets/logo.png'

const IconLink = styled((props) => <Link {...props} />)(({ theme }) => ({
  display: "block",
  color: "white",
  fontSize: "20px",
  "&.bi-youtube:hover": {
    color: "#CD201F",
  },
  "&.bi-instagram:hover": {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  "&.bi-linkedin:hover": {
    color: "#0A66C2",
  },
  "&.bi-facebook:hover": {
    color: "#1877F2",
  },
}));

function Footer() {
  return (
    <Box
      component="footer"
      mt={"auto"}
      sx={{
        bgcolor: "#222222",
        color: "#FFFFFF",
        padding: "32px 56px 20px 56px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box
          sx={{
            // width: '200px',
            img: {
              width: "100%",
              objectFit: "cover",
              aspectRatio: "5 / 1",
            },
          }}
        >
          {/* <img src={logo} alt='Carosiast-logo' /> */}
          <Typography fontSize={36} fontWeight={600}>
            Carosiast
          </Typography>
        </Box>
        <Stack spacing={0.5}>
          <Typography fontWeight={600} fontSize={20}>
            SOCIAL LINKS
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconLink
              href="https://www.youtube.com/@DikshantVyas"
              target="_blank"
              className="bi bi-youtube"
            />
            <IconLink
              href="https://www.instagram.com/dikshant_dv/"
              target="_blank"
              className="bi bi-instagram"
            />
            <IconLink href="#" target="_blank" className="bi bi-linkedin" />
            <IconLink href="#" target="_blank" className="bi bi-facebook" />
          </Stack>
        </Stack>
        <Stack spacing={0.5}>
          <Typography fontWeight={600} fontSize={20}>
            OVERVIEW
          </Typography>
          <Stack spacing={1}>
            <Typography>About Us</Typography>
            <Typography>Privacy Policy</Typography>
            <Typography>Terms & Conditions</Typography>
          </Stack>
        </Stack>
        <Stack spacing={0.5}>
          <Typography fontWeight={600} fontSize={20}>
            CONNECT WITH US
          </Typography>
          <Stack spacing={1}>
            <Link href="mailto:carosiast@gmail.com" className="footer-link">
              <Typography>Write an E-mail</Typography>
            </Link>
            <Link href="mailto:carosiast@gmail.com" className="footer-link">
              <Typography>Contact Us</Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
      <Box mt={5}>
        <Typography fontWeight={500} fontSize={16} className="text-center">
          © {new Date()?.getFullYear()} Carosiast Pvt. Ltd.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
