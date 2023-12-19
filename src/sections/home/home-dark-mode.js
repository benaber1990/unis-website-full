import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { MotionViewport, varFade } from 'src/components/animate';
import COLORS from 'src/COLORS';

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  const settings = useSettingsContext();

  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          STAY COMPLIANT. STAY ORGANISED. STAY AHEAD
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ color: 'common.white' }}>
          REQUEST, RESPOND & REPORT AT THE{' '}
          <span style={{ color: COLORS.purple }}>TOUCH OF A BUTTON</span>
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'grey.500' }}>Software that fits into your company</Typography>
      </m.div>
    </Stack>
  );

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Image
        alt="darkmode"
        src="/assets/images/home/darkmode.webp"
        sx={{
          borderRadius: 2,
          my: { xs: 5, md: 10 },
          boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
        }}
      />
    </m.div>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: 'grey.900',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {/* {renderImg} */}

        <img
          src="https://i.imgur.com/RggB0pF.png"
          alt=""
          style={{
            borderRadius: 40,
            objectFit: 'contain',
            // resize: 'contain',
            height: 800,
            marginTop: 50,
            marginBottom: 120,
            border: `2px solid ${COLORS.green}`,
          }}
        />
      </Container>
    </Box>
  );
}
