import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from '../models'
import { MainLayout } from '../components/layout'
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {

  return (
    <Box>
        Home page
    </Box>
  )
}
Home.Layout = MainLayout
export default Home
