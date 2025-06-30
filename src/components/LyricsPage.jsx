import { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";

import {
  Box, Typography, Button, TextField, 
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "../assets/css/style.css"

// トップ
const LyricsPage = () => {
  const { state } = useLocation();
  const [lyrics, setLyrics] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [infomation, setInfomation] = useState(null);
  
  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${state.ssid}/values/シート2?key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`)
      .then(res => res.json())
      .then(datas => {
        setInfomation(datas.values);
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      setLyrics(null);
      setPassword(null);
      setError(null);
      setInfomation(null);
    };
  }, [state.title]);

  const getLyrics = () => {
    if (password === state.password) {
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${state.ssid}/values/シート1?key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`)
        .then(res => res.json())
        .then(datas => {
          let array = [];
          datas.values.forEach((e, i) => {
            if (i === 0) return;
            array.push({
              "origin": e[0],
              "translation": e[1],
              "audition": e[2],
            });
          })
          setLyrics(array);
        }
      );
    } else {
      setError(true);
    }
  }
  
  return (
    <section className='LyricsPage'>
      <Typography variant="h2">{`${state.title} from ${state.musical}`}</Typography>
      <Box className='LyricsPage__infomation'>
        {infomation?.map((e, i) => {
          if (URL.canParse(e[1])) {
            return <Link key={i} to={e[1]} target="_blank"><Button variant='outlined'>{e[0]}<YouTubeIcon /></Button></Link>;
          } else {
            return <p>{`${e[0]}：${e[1]}`}</p>
          }
        })}
      </Box>
      {!lyrics ? <Box className='LyricsPage__password'>
        Password：<TextField variant='standard' sx={{ width: '100px' }}
          error={error}
          helperText={!error || "パスワードが違います"}
          type='password'
          onChange={e => setPassword(e.target.value)}></TextField>
        <Button variant='outlined' onClick={getLyrics}>決定</Button>
      </Box> : <Table className='LyricsPage__table'>
        <TableHead>
          <TableRow>
            <TableCell>原詞</TableCell>
            <TableCell>訳詞</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lyrics?.map((e, i) => {
            const bgcolor = e.audition ? "#f2dae3" : "#fff";
            return (
              <TableRow key={i}>
                <TableCell sx={{bgcolor: bgcolor}}>{e.origin}</TableCell>
                <TableCell sx={{bgcolor: bgcolor}}>{e.translation}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>}
    </section>
  );
};

export default LyricsPage;