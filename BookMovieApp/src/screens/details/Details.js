import React,{useEffect,useState} from 'react'
import Header from '../../common/header/Header'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'
import { Typography,ImageList  } from '@mui/material';
import YouTube from 'react-youtube'
import './Details.css'

const Details = ({ ...props, baseUrl }) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [value, setValue] = useState(0);
    let movieId = props.match.params.id;
    useEffect(() => {
        fetch(`http://localhost:8085${baseUrl}movies?page=1&limit=10`)
            .then(res => res.json()).then(data => setMovieDetails(data.movies))
    }, [])
    
    if (movieDetails != null) {
        var currentMovie = movieDetails.filter((movie) => movie.id.includes(movieId))[0];  
    }
    return (
        <div>
            <Header />
            <Link to={'/'} className="backButton" ><ArrowBackIosIcon fontSize="small"/><Typography>Back to Home</Typography></Link>
            {currentMovie &&
                <div className="detailsContainer">
                    <div className="leftContainer">
                        <img src={currentMovie.poster_url}/>
                    </div>
                    <div className="middleContainer" >
                        <Typography variant="headline" component="h2" fontWeight={500}>{currentMovie.title}</Typography>
                        <Typography ><b>Genres: </b>{currentMovie.genres.join(', ')}</Typography>
                        <Typography ><b>Duration: </b>{currentMovie.duration}</Typography>
                        <Typography ><b>Release Date: </b>{new Date(currentMovie.release_date).toDateString()}</Typography>
                        <Typography ><b>Rating: </b>{currentMovie.rating}</Typography>
                        <Typography mt={2}><b>Plot: </b><a href={currentMovie.wiki_url}>( Wiki Link)</a>{currentMovie.storyline}</Typography>
                        <Typography mt={2}><b>Trailer </b>{currentMovie.storyline}</Typography>
                        <YouTube videoId={currentMovie.trailer_url.split("watch?v=")[1]}/>
                    </div>
                    <div className="rightContainer">
                        <Typography><b>Rate this moive:</b></Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        />
                        <Typography mt={2}><b>Artists:</b></Typography>
                        <ImageList cols={2}>
                            {currentMovie.artists.map((artist) => (
                                <ImageListItem>
                                    <img
                                        src={`${artist.profile_url}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${artist.profile_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={movie.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
            }

        </div>
    )
}

export default Details