import React,{useState,useEffect} from 'react';
import './Home.css'
import Header from '../../common/header/Header'
import { ImageListItem,ImageListItemBar,ImageList  } from '@mui/material';



const Home = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8085/api/v1/movies?page=1&limit=10&status=PUBLISHED')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    return (
        <div>
            <Header/>
            <div className="upcomingTitle">Upcoming Movies</div>
            <ImageList cols={10} rows={1}rowHeight={250} md={{ overflow: 'visible' }}>
            {data && data.movies.map(movie => (
                // <div key={movie.id}>
                    <ImageListItem key={movie.id} sx={{ width: 250}} >
                    <img
                        src={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${movie.poster_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        // alt={movie.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                    title={movie.title}
                    />
                    </ImageListItem>
                // </div>
            ))}
            </ImageList>
        </div>
    )
}

export default Home;