import React,{useEffect,useState} from 'react'
import Header from '../../common/header/Header'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';
import './Details.css'

const Details = ({ ...props, baseUrl }) => {
    const [movieDetails, setMovieDetails] = useState(null);
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
                        {currentMovie.title}
                    </div>
                        <div className="rightContainer">
                        {currentMovie.title}
                    </div>
                </div>
            }

        </div>
    )
}

export default Details