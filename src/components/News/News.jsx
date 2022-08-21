import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

const News = () => {

    const noticias = useSelector((state) => state.noticiasReducer)

    return (
        <Grid md={10}>
            {noticias.all === null ? (
                <Typography variant="h3" gutterBottom sx={{textAlign: 'center', marginTop: '20px'}}>
                    No se encontraron resultados
                </Typography>
            ) :
                <Grid md={12}>
                    {noticias.all.map((noticia) => (
                        <Card sx={{ marginTop: '10px' }}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={noticia.urlToImage}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {noticia.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {noticia.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container justifyContent='space-between' sx={{ marginLeft: '10px' }}>
                                    <Grid md={3}>
                                        <Typography variant="overline" gutterBottom sx={{ marginTop: '10px' }}>
                                            {Moment(noticia.publishedAt).format('DD-MM-yyyy')}
                                        </Typography>
                                    </Grid>
                                    <Grid md={1}>
                                        <a to={noticia.url} href={noticia.url} target='_blank' style={{ color: 'orange' }}> Ver mas...</a>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            }

        </Grid>
    );
};

News.propTypes = {

};

export default News;