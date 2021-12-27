import React from "react";
import { WeatherData } from '../../types';
import { Box, Typography } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type FavoritesProps = {
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
};

export const Favorites: React.FC<FavoritesProps> = ({ favorites, setFavorites }) => {

    const removeFromFavorites = (name: string) => {
        const updatedFavorites = favorites.filter(favorite => favorite.name !== name);
        setFavorites(updatedFavorites)
    }
   
    return (
        <React.Fragment>
           <Typography variant='h2' sx={{ fontSize: 35, marginBottom: '60px' }}>Favorited cities:</Typography>
           {favorites.length > 0 ? (
               favorites.map((favorite, i) => {
                return (
                    <Box sx={{ display: "flex"}} marginBottom='20px' key={i}>
                        <Box>
                            <Typography variant='body1' sx={{ fontSize: 24}}>{favorite.name}</Typography>
                        </Box>
                        <Box onClick={() => removeFromFavorites(favorite.name)}>
                            <RemoveCircleOutlineIcon sx={{ fontSize: 35, marginLeft: '20px', cursor: 'pointer'}}/>
                        </Box>
                    </Box>
                )
           })) : (
            <Typography variant='body1' sx={{ fontSize: 24}}>You do not have any saved cities</Typography>
           )
        }
        </React.Fragment>
    )
};