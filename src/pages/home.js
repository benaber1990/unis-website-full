import { Helmet } from 'react-helmet-async';
// sections
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> UNIS: All You Need to Manage Your Construction Company in One Place</title>
      </Helmet>

      <HomeView />
    </>
  );
}
