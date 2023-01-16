import React from 'react';
import { NavLink } from "react-router-dom";
import { AppBar, Button, IconButton, InputAdornment, Stack, TextField, Box } from "@mui/material";
import { styled } from '@mui/material/styles'
import { grey } from "@mui/material/colors"
import SearchIcon from '@mui/icons-material/Search';
import AppLogo from "../../assets/logo.png";
import { Image } from 'react-bootstrap';

const Logo = styled((props) => (
    <Box {...props} />
))(({ theme }) => ({
    width: 162,
    '& img': {
        width: "inherit",
        objectFit: 'cover',
        aspectRatio: "5 / 1",
    }
}))

const NavButton = styled((props) => (
    <NavLink {...props} variant="outlined" sx={{ whiteSpace: 'nowrap' }} />
))(({ theme }) => ({
    color: 'black',
    fontFamily: 'inherit',
    fontWeight: 600,
    fontSize: '1rem',
    border: `2px solid rgba(0,0,0,0)`,
    borderRadius: '8px',
    padding: '0px 8px !important',
    '&.active, :hover': {
        border: `2px solid ${theme.palette.common.black}`,
    }
}))

const SearchBar = styled((props) => (
    <TextField {...props}
        hiddenLabel
        size='small'
        color='error'
        // variant='filled'
        InputProps={{ endAdornment: <InputAdornment position='end'><IconButton><SearchIcon /></IconButton></InputAdornment> }}
        inputProps={{
            style: {
                padding: 7,
                fontFamily: "inherit",
            }
        }}
    />
))(({ theme }) => ({
    width: '50vw',
    backgroundColor: '#F3F3F3',
    borderRadius: '7px',
    '& .MuiInputBase-root': {
        paddingRight: '0px',
        borderRadius: 'inherit',
    },
    '& input::placeholder': {
        fontWeight: 500,
        color: 'rgba(0,0,0,)'
    }
}))

function Navbar() {

    return (
        <AppBar position='static' sx={{
            backgroundColor: 'white',
            color: 'black',
        }}>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                px={3}
                py={2}
                sx={{ borderBottom: `3px solid ${grey[400]}` }}
            >
                <NavLink to="/">
                    <Logo>
                        <Image src={AppLogo} rounded />
                    </Logo>
                </NavLink>
                <SearchBar placeholder='Search Cars or Brands eg. Tiago, or Tata' />
                <Stack direction='row' spacing={2}>
                    <Button variant='contained' color="error" size='small'
                        sx={{
                            color: 'white',
                            backgroundColor: 'error.main',
                            fontWeight: 'bold',
                            fontFamily: 'inherit',
                        }}>Login</Button>
                </Stack>
            </Stack>
            <Stack px={1} py={0.5}>
                <Stack direction='row' spacing={2} mx='auto' py={1}>
                    <NavButton to="/">Home</NavButton>
                    <NavButton to="/blogs">Blogs</NavButton>
                    <NavButton to="/brands">Brands</NavButton>
                    <NavButton to="/category">Category</NavButton>
                    <NavButton to="/about">About Us</NavButton>
                    <NavButton to="/contact">Contact</NavButton>
                    <NavButton to="/more">More</NavButton>
                </Stack>
            </Stack>
        </AppBar>
    )
}
export default Navbar;