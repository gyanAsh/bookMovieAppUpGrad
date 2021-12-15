import React,{useState,useEffect} from 'react';
import './Home.css'
import Header from '../../common/header/Header'
import {createTheme} from '@mui/material/styles'
import {
    ImageListItem, ImageListItemBar, ImageList, Card, TextField,
    Typography, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText,
    OutlinedInput
} from '@mui/material';
import { palette } from '@mui/system';



const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState(null);
    const [releasedMovies, setReleasedMovies] = useState(null);
    const [genre, setGenre] =useState([]);
    useEffect(() => {
        fetch('http://localhost:8085/api/v1/movies?page=1&limit=10&status=PUBLISHED')
            .then(res => res.json())
            .then(data => setUpcomingMovies(data));
        fetch('http://localhost:8085/api/v1/movies?page=1&limit=10&status=RELEASED')
            .then(res => res.json())
            .then(data=>setReleasedMovies(data));
    }, [])
    const theme = createTheme({
        spacing: 8,
        components: {
            MuiTypography: {
              defaultProps: {
                variantMapping: {
                  h1: 'h2',
                  h2: 'h2',
                  h3: 'h2',
                  h4: 'h2',
                  h5: 'h2',
                  h6: 'h2',
                  subtitle1: 'h2',
                  subtitle2: 'h2',
                  body1: 'span',
                  body2: 'span',
                },
              },
            },
        },
    })
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setGenre(
          typeof value === 'string' ? value.split(',') : value,
        );
      };
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };
    return (
        <div>
            <Header/>
            <div className="upcomingTitle">Upcoming Movies</div>
            <ImageList cols={10} rows={1}rowHeight={250} md={{ overflow: 'visible' }}>
            {upcomingMovies && upcomingMovies.movies.map(movie => (
                    <ImageListItem key={movie.id} sx={{ width: 250, height:250}} >
                    <img
                        src={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                    title={movie.title}
                    />
                    </ImageListItem>
            ))}
            </ImageList>
            <div className="moviesAndFilter">
                <ImageList cols={4} className="movies" rowHeight={350} >
                    {releasedMovies && releasedMovies.movies.map(movie => (
                        <ImageListItem key={movie.id} sx={{ width: 220, maxHeight: 350 }}>
                            <img
                                src={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={movie.title}
                                loading="lazy"
                                
                            />
                            <ImageListItemBar
                                title={movie.title}
                                subtitle={<span>Release Date:{ movie.release_date }</span>}
                            />                            
                        </ImageListItem>
                        
                    ))}
                </ImageList>
                <div className="filter">
                    <Card variant="outlined" sx={{ widht: "100%", height: "auto" }}>
                        <Typography sx={{margin: theme.spacing(1),minWidth:240, maxWidth:240 ,color:"primary.light"}}>FIND MOVIES BY:</Typography>
                        <TextField label="Movie Name" variant="standard" sx={{margin: theme.spacing(1),minWidth:240, maxWidth:240}}/>
                        <FormControl sx={{margin: theme.spacing(1),minWidth:240, maxWidth:240 }}>
                            <InputLabel variant="standard" >Genre</InputLabel>
                                <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                variant="standard"
                                multiple
                                value={genre}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                                {releasedMovies && releasedMovies.movies.map((movie) => (
                                    movie.genres.map( genres=>(
                                            <MenuItem key={genres} value={genres}>
                                    <Checkbox checked={genre.indexOf(genres) > -1} />
                                    <ListItemText primary={genres} />
                                    </MenuItem>))
                                ))}
                                </Select>
                        </FormControl>
                  
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home;