import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Cards from '../../Slide/Card';

const ListPage = () => {
    const { user } = useAuth0();
    const [likedmovie, setlikedmovie] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DATABASE}/api/likedmovie/${user.email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.msg === "Success") {
                    setlikedmovie(data.movies);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [user.email]);

    const handleRemoveMovie = (movieId) => {
        setlikedmovie((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    }


    return (
        <div>
            <br />
            <br />
            <br />
            <br />

            <br />
            <br />
            <div className="list">
                {likedmovie && likedmovie.length > 0 ? (
                    likedmovie.map((movie, index) => (
                        <Cards key={index} movie={movie} onRemove={handleRemoveMovie} isLiked={likedmovie && likedmovie.some(m => m.id === movie.id)}/>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>


        </div>
    )
}

export default ListPage
