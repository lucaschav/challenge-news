import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Moment from 'moment';

const Filter = () => {

    const dispatch = useDispatch()
    const [pais, setPais] = useState("es")
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [busca, setBusca] = useState("")
    const [fechaDesde, setDesde] = useState(null)
    const [fechaHasta, setHasta] = useState(null)
    const [cargando, setCarga] = useState(false)
    const noticias = useSelector((state) => state.noticiasReducer)

    const changePais = (event) => {
        setPais(event.target.value)
        changeNews(1, size, event.target.value, fechaDesde, fechaHasta, busca)
    }

    const changeSize = (event) => {
        debugger
        setSize(event.target.value)
        changeNews(1, event.target.value, pais, fechaDesde, fechaHasta, busca)
    }

    const changePage = (event = null, value = 1) => {
        setPage(value)
        changeNews(value, size, pais, fechaDesde, fechaHasta, busca)
    }

    const formik = useFormik({
        initialValues: {
            buscador: '',
        },
        validationSchema: Yup.object({
            buscador: Yup.string()
                .min(1, 'ingresar como minimo un caracter')
                .required('el campo PALABRA CLAVE es requerido')
        }),
        onSubmit: values => {
            
            setBusca(values.buscador)
            changeNews(1, size, pais, fechaDesde, fechaHasta, values.buscador)
        },
    })

    const changeNews = async (pageSelect = page, pageSize = size, paisSelect = pais, fechaDes = fechaDesde, fechaHas = fechaHasta, buscar) => {
        debugger
        setCarga(true)
        if (fechaDes !== null) {
            fechaDes = '&startDate=' + Moment(fechaDesde).format('yyyy-MM-DD')
        }
        else{
            fechaDes = ''
        }
        if (fechaHas !== null) {
            fechaHas = '&endDate=' + Moment(fechaHasta).format('yyyy-MM-DD')
        }
        {
            fechaHas = ''
        }
        const response = await axios.get(
            appsettings.BaseApi + 'search?search=' + buscar + '&country=' + paisSelect + '&page=' + pageSelect + '&pageSize=' + pageSize + fechaDes + fechaHas
        )
        setCarga(false)
        if (response.status === 200) {
            setPage(response.data.actualPage)
            dispatch(setAllNews(response.data))
        }
    }

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
                        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid black' }}>
                            Portal de Noticias
                        </Typography>
                        <Grid container justifyContent='space-between'>
                            <Grid md={4} xs={6}>
                                <Typography variant="overline" display="block" gutterBottom sx={{ marginTop: '10px' }}>
                                    <Link href='/' to='/' style={{ color: 'orange' }}>Ultimas Noticias </Link>
                                    / Buscador
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
                                        <MenuItem value={'es'}>Argentina</MenuItem>
                                        <MenuItem value={'de'}>Alemania</MenuItem>
                                        <MenuItem value={'fr'}>Francia</MenuItem>
                                        <MenuItem value={'pt'}>Portugal</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box component="form" type="post" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <Grid container justifyContent='space-between'>
                                <Grid md={6} xs={12}>
                                    <Grid md={10} sx={{ marginTop: '15px' }}>
                                        <TextField
                                            id="fechaDesde"
                                            type='date'
                                            fullWidth
                                            label='Fecha Desde'
                                            defaultValue={fechaDesde}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(newValor) => {
                                                setDesde(newValor.target.value);
                                              }}
                                        />
                                    </Grid>
                                    <Grid md={10} xs={12} sx={{ marginTop: '10px' }}>
                                        <TextField
                                            id="fechaHasta"
                                            type='date'
                                            fullWidth
                                            label='Fecha Hasta'
                                            defaultValue={fechaHasta}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(newValue) => {
                                                setHasta(newValue.target.value);
                                              }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <Grid md={12}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            label="Palabras clave"
                                            type='text'
                                            name='buscador'
                                            
                                            value={formik.values.buscador}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.buscador ? (
                                            <Typography variant="body2" gutterBottom sx={{ color: 'red', fontSize: '12px'}}>
                                                {formik.errors.buscador}
                                            </Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid md={12}>
                                        <Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Buscar
                                        </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <News />
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

Filter.propTypes = {

};

export default Filter;