import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { textGradient, bgGradient, bgBlur } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';
import COLORS from 'src/COLORS';
// import {
//   getAuth,
//   signOut,
//   signInWithPopup,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   TwitterAuthProvider,
//   sendEmailVerification,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';
// import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// // config
// import { FIREBASE_API } from 'src/config-global';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  background: `radial-gradient(circle at 50% 0%, #000 70%, ${COLORS.purple})`,
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${COLORS.green} 0%, ${'#5a3c97'} 25%, ${'green'} 50%, ${'#41149a'} 75%, ${
      COLORS.purple
    } 100%`
  ),
  padding: 0,
  // marginTop: 8,
  lineHeight: 1.2,
  // marginBottom: 24,
  marginBottom: 12,
  letterSpacing: 2,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: '80px',
  '@media (max-width: 600px)': {
    fontSize: '48px', // Adjust the font size for smaller screens
  },
  fontWeight: '900',
  fontFamily: 'Poppins, sans-serif',
  [theme.breakpoints.up('md')]: {
    fontSize: 64,
    // fontSize: `${96 / 16}rem`,
  },
}));

const WhiteTextSpan = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${'#ffffff'} 0%, ${'#ffffff'} 25%, ${'#ffffff'} 50%, ${'#ffffff'} 75%, ${'#ffffff'} 100%`
  ),
  padding: 0,
  // marginTop: 8,
  lineHeight: 1.4,
  marginBottom: 0,
  letterSpacing: 2,
  fontWeight: '900',
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: '80px',
  '@media (max-width: 600px)': {
    fontSize: '48px', // Adjust the font size for smaller screens
  },
  fontFamily: 'Poppins, sans-serif',
  [theme.breakpoints.up('md')]: {
    // fontSize: `${96 / 16}rem`,
    fontSize: 64,
  },
}));

const SmallWhiteTextSpan = styled(m.p)(({ theme }) => ({
  ...textGradient(
    `300deg, ${'#ffffff'} 0%, ${'#ffffff'} 25%, ${'#ffffff'} 50%, ${'#ffffff'} 75%, ${'#ffffff'} 100%`
  ),
  padding: 0,
  // marginTop: 8,
  lineHeight: 1.4,
  marginBottom: 0,
  letterSpacing: 0,
  fontWeight: '500',
  // textAlign: 'center',
  backgroundSize: '400%',
  color: 'red',
  fontSize: 32,
  fontFamily: 'Poppins, sans-serif',
  [theme.breakpoints.up('md')]: {
    // fontSize: `${96 / 16}rem`,
    fontSize: 32,
  },
}));

const SmallPurpleTextStyle = styled(m.p)(({ theme }) => ({
  ...textGradient(`300deg, ${'red'} 0%, ${'red'} 25%, ${'red'} 50%, ${'red'} 75%, ${'red'} 100%`),

  lineHeight: 1.4,
  marginBottom: 0,
  letterSpacing: 0,
  fontWeight: '500',
  // textAlign: 'center',
  alignSelf: 'flex-start',
  backgroundSize: '400%',
  fontSize: 12,
  fontFamily: 'Poppins, sans-serif',
  // [theme.breakpoints.up('md')]: {
  //   fontSize: 12,
  // },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledPolygon = styled('div')(({ opacity = 1, anchor = 'left', theme }) => ({
  ...bgBlur({
    opacity,
    // color: theme.palette.background.default,
    color: '#000',
  }),
  zIndex: 9,
  bottom: 0,
  height: 80,
  width: '50%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  ...(anchor === 'left' && {
    left: 0,
    ...(theme.direction === 'rtl' && {
      transform: 'scale(-1, 1)',
    }),
  }),
  ...(anchor === 'right' && {
    right: 0,
    transform: 'scaleX(-1)',
    ...(theme.direction === 'rtl' && {
      transform: 'scaleX(1)',
    }),
  }),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [findIsHover, setFindIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setFindIsHovered(true);
  };

  const handleMouseLeave2 = () => {
    setFindIsHovered(false);
  };

  // Email Sign Up
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const mdUp = useResponsive('up', 'md');

  const theme = useTheme();

  const heroRef = useRef(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const isLight = theme.palette.mode === 'light';

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  };

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        // mx: 'auto',
        // maxWidth: 480,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        {/* <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          Fast. Simple. Secure
        </Typography> */}
      </m.div>

      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          <WhiteTextSpan>Construction management</WhiteTextSpan>
          in One Place
        </StyledTextGradient>
      </m.div>

      <div
        style={{
          fontSize: '28px',
          '@media (max-width: 600px)': {
            fontSize: '28px', // Adjust the font size for smaller screens
          },
          color: 'lightgrey',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        An <span style={{ color: COLORS.purple }}>AI-Powered</span> app & software for everything
        from conception to completion
      </div>

      <m.div variants={varFade().in}>
        {/* <Stack
          spacing={0.75}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 3 }}
        >
          <Rating readOnly value={4.95} precision={0.1} max={5} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <Box component="strong" sx={{ mr: 0.5, color: 'text.primary' }}>
              4.96/5
            </Box>
            (99+ reviews)
          </Typography>
        </Stack> */}
      </m.div>

      <div style={{ height: 60 }} />

      <div
        style={{
          height: 4,
          background: `linear-gradient(to right, ${COLORS.green}, ${COLORS.purple})`,
          width: 1200,
        }}
      />

      <div style={{ height: 60 }} />

      <div style={{ display: 'flex' }}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            width: 200,
            borderRadius: 6,
            marginRight: 10,
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: '700',
            background: isHovered ? COLORS.purple : 'white',
            color: isHovered ? 'white' : COLORS.dark,
            border: isHovered ? `2px solid ${COLORS.purple}` : `2px solid white`,
            transition: 'background-color 0.3s, color 0.3s, border 0.3s', //
          }}
        >
          Book a Demo
        </div>
        <div
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            width: 200,
            borderRadius: 6,
            marginLeft: 10,
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: '700',
            backgroundColor: findIsHover ? COLORS.purple : '',
            color: findIsHover ? 'white' : 'white',
            border: findIsHover ? `2px solid ${COLORS.purple}` : `2px solid ${COLORS.purple}`,
            transition: 'background-color 0.3s, color 0.3s, border 0.3s', //
          }}
        >
          Find Out More
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', marginTop: 30, alignItems: 'flex-end' }}
        >
          <label htmlFor="emailInput">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
              style={{
                height: 50,
                width: 350,
                paddingLeft: 20,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                backgroundColor: 'white',
                margin: '0', // Adjust margin as needed
                fontSize: '18px', // Adjust font size as needed
                outline: 'none', // Remove outline on focus
                border: 'none',
              }}
            />
          </label>
          <button
            style={{
              border: 'none',
              // width: 140,
              paddingLeft: 30,
              paddingRight: 30,
              marginLeft: -3,
              height: 50,
              backgroundColor: COLORS.purple,
              color: 'inherit',
              font: 'inherit',
              cursor: 'pointer',
              outline: 'none',
              fontSize: '16px',
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              fontWeight: '700',
            }}
            type="submit"
          >
            Send Me Info
          </button>
        </form>
      </div>
      <m.div variants={varFade().in} />
    </Stack>
  );

  const renderSlides = <div style={{ marginTop: 80 }} />;

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  const renderEllipses = (
    <>
      {mdUp && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid style={{ marginTop: 160 }}>
              <Grid xs={12} md={6}>
                {renderDescription}
              </Grid>

              {mdUp && <Grid md={6}>{renderSlides}</Grid>}
            </Grid>
          </Container>

          {renderEllipses}
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
