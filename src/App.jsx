import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider, Drawer, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloseIcon from '@mui/icons-material/Close';

import FrontPage from "./components/FrontPage";
import LyricsPage from "./components/LyricsPage";

import './assets/css/style.css';

function App() {
	const [data, setData] = useState([]);
  const [open, setopen] = useState(false);

  const root = import.meta.env.BASE_URL;
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_DOC_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const mailAddress = import.meta.env.VITE_MAIL_ADDRESS;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f19cbb',
      },
    },
  });
  
  useEffect(() => {
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1?key=${apiKey}`)
        .then(res => res.json())
        .then(datas => {
          let array = [];
          const itemName = datas.values[0];
          datas.values.forEach((e, i) => {
            if (i === 0) return;
            array.push({
              [itemName[0]]: e[0],
              [itemName[1]]: e[1],
              [itemName[2]]: e[2],
              [itemName[3]]: e[3],
            });
          })
          setData(array);
        }
      );
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setopen(!open)}
          >
            <MenuIcon />
          </Button>
          <Link to={root} style={{ textDecoration: 'none', color: '#fff' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ゆりのミュージカル訳詞
            </Typography>
          </Link>
          <Box className="App__contact">
            <Link to={`mailto:${mailAddress}`}>
              <EmailOutlinedIcon fontSize='large' style={{ color: '#fff' }}/>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer className='SideBar' anchor='left' open={open} onClose={() => setopen(!open)}>
        <Box>
          <Typography variant="h2">メニュー</Typography>
          <Button
            size="large"
            edge="end"
            color="inherit"
            aria-label="close"
            sx={{ float: 'right' }}
            onClick={() => setopen(!open)}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Button>
          <Link to={root} underline="hover" onClick={() => setopen(!open)}>トップ</Link>
        </Button>
        {data.map((e, i) => (
          <Button className='SideBar__title' key={i}>
            <Link to={root + "LyricsPage"} state={e} underline="hover" onClick={() => setopen(!open)}>
              {`${e.title} - ${e.musical}`}
            </Link>
          </Button>
        ))}
      </Drawer>
      <Routes>
        <Route exact path={root} element={<FrontPage {...{data: data}} />} />
        <Route path={root + "LyricsPage"} element={<LyricsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;