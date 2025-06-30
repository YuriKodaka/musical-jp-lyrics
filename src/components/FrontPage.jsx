import { Link } from 'react-router-dom';

import {
  Box, Button,
} from '@mui/material';

// トップ
const FrontPage = ({ data }) => {

  const root = import.meta.env.BASE_URL;
  const mailAddress = import.meta.env.VITE_MAIL_ADDRESS;
  
  return (
    <section className='FrontPage'>
      <Box>
        <p>趣味で訳詞をしています💖</p>
        <p>サイトも自分で1から作ってます！</p>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <p>小高優里（こだかゆり）</p>
          <Button sx={{textTransform: "none"}}>
            <Link to={`mailto:${mailAddress}`}>Mail</Link>
          </Button>
          <Button sx={{textTransform: "none"}}>
            <Link to="https://www.instagram.com/yuri_kodaka?igsh=eGEyZ3ZoNHIjbTJ4" target="_blank">Instagram</Link>
          </Button>
        </Box>
      </Box>
      <Box className='FrontPage__buttons'>
        {data?.map((e, i) => (
          <Button key={i} variant='outlined' sx={{textTransform: "none", color: "#111"}}>
            <Link to={root + "LyricsPage"} state={e}>
              <p>{`${e.title} - ${e.musical}`}</p>
            </Link>
            </Button>
        ))}
      </Box>
    </section>
  );
};

export default FrontPage;