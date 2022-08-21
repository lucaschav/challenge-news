import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import appsettings from '../../appsettings.json'
import axios from 'axios';
import { Link } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { setAllNews } from '../../redux/reducers/noticiasReducer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import News from '../News/News';

const Home = () => {

    const dispatch = useDispatch()
    const [pais, setPais] = useState("ar")
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [cargando, setCarga] = useState(true)
    const noticias = useSelector((state) => state.noticiasReducer)

    const changePais = (event) => {
        setPais(event.target.value)
        changeNews(1, size, event.target.value)
    }

    const changeSize = (event) => {
        debugger
        setSize(event.target.value)
        changeNews(1, event.target.value, pais)
    }

    const changePage = (event = null, value = 1) => {
        setPage(value)
        changeNews(value, size, pais)
    }

    const changeNews = async (pageSelect = page, pageSize = size, paisSelect = pais) => {
        debugger
        setCarga(true)
        const response = await axios.get(
            appsettings.BaseApi + 'top-headlines?country=' + paisSelect + '&page=' + pageSelect + '&pageSize=' + pageSize
        )
        setCarga(false)
        if (response.status === 200) {
            setPage(response.data.actualPage)
            dispatch(setAllNews(response.data))
        }
    }

    useEffect(() => {
        changeNews()
    }, [])

    return (
        <Container fixed sx={{ marginTop: '30px' }}>
            {cargando === true ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) :
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='center'>
                    <Grid md={10}>
                        <Typography variant="h4" gutterBottom sx={{borderBottom: '2px solid black'}}>
                            Portal de Noticias
                        </Typography>
                        <Grid container justifyContent='space-between'>
                            <Grid md={4} xs={6}>
                                <Typography variant="overline" display="block" gutterBottom sx={{ marginTop: '10px' }}>
                                    Ultimas Noticias /
                                    <Link href='/buscador' to='/buscador' style={{ color: 'orange' }}> Buscador</Link>
                                </Typography>
                            </Grid>
                            <Grid md={2} xs={6}>
                                <FormControl variant="standard" sx={{ minWidth: '98%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Pais</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={pais}
                                        onChange={changePais}
                                        label="Pais"
                                    >
                                        <MenuItem value={'ar'}>Argentina</MenuItem>
                                        <MenuItem value={'br'}>Brasil</MenuItem>
                                        <MenuItem value={'us'}>Estados Unidos</MenuItem>
                                        <MenuItem value={'jp'}>Japon</MenuItem>
                                        <MenuItem value={'de'}>Alemania</MenuItem>
                                        <MenuItem value={'fr'}>Francia</MenuItem>
                                        <MenuItem value={'mx'}>Mexico</MenuItem>
                                        <MenuItem value={'pl'}>Polonia</MenuItem>
                                        <MenuItem value={'pt'}>Portugal</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <News/>
                    <Grid md={10} container justifyContent='space-between'>
                        <Grid md={5}>
                            <Typography variant="overline" display="block" gutterBottom sx={{ marginTop: '14px' }}>
                                Mostrar
                                <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                                    <InputLabel id="demo-select-small"></InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={size}
                                        onChange={changeSize}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                    </Select>
                                </FormControl>
                                resultados
                            </Typography>
                        </Grid>
                        <Grid md={4}>
                            <Pagination count={Math.ceil(noticias.totalPages / size)} page={page} variant="outlined" size='small' sx={{ marginTop: '20px' }} onChange={changePage} />
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Container>
    );
};

Home.propTypes = {

};

export default Home;