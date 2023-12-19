import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { textGradient, bgGradient } from 'src/theme/css';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import COLORS from 'src/COLORS';

// ----------------------------------------------------------------------

export default function HomeForDesigner() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderDescription = (
    <Box
      sx={{ textAlign: { xs: 'center', md: 'unset' }, mt: { xs: 10, md: 20 }, marginBottom: 10 }}
    >
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            // textShadowColor: 'red',
            // textShadowOffset: { width: -3, height: 3 },
            // textShadowRadius: 10,
            mt: 3,
            mb: 5,
            ...textGradient(`300deg, ${COLORS.purple} 10%, ${COLORS.green} 90%`),
          }}
        >
          All You Need On The Move with Real-Time App Integration
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          color="inherit"
          size="large"
          variant="contained"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          target="_blank"
          rel="noopener"
          href={paths.contact}
        >
          Find Out More
        </Button>
      </m.div>
    </Box>
  );

  const renderImg = (
    <Box
      component={m.img}
      src="/assets/images/home/for_designer.webp"
      variants={varFade().in}
      sx={{
        height: 1,
        width: 0.5,
        objectFit: 'cover',
        position: 'absolute',
        boxShadow: `-80px 80px 80px ${
          theme.palette.mode === 'light'
            ? alpha(theme.palette.grey[500], 0.48)
            : alpha(theme.palette.common.black, 0.24)
        }`,
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: 560,
        overflow: 'hidden',
        position: 'relative',
        ...bgGradient({
          startColor: `${'red'}`,
          endColor: COLORS.purple,
          imgUrl: '/assets/images/home/for_designer.webp',
        }),
        ...(mdUp && {
          ...bgGradient({
            startColor: 'black',
            endColor: COLORS.purple,
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
        }),
      }}
    >
      <Container component={MotionViewport}>
        <Grid container>
          <Grid xs={12} md={6}>
            {renderDescription}
          </Grid>
          <div style={{ borderRadius: 20 }}>
            <img
              src="https://i.imgur.com/0ZDTjQd.jpg"
              alt=""
              style={{ width: 550, objectFit: 'contain', borderRadius: 40, marginTop: 100 }}
            />
          </div>

          {/* {mdUp && <Grid md={6}>{renderImg}</Grid>} */}
        </Grid>
      </Container>
    </Box>
  );
}
