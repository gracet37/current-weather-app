import React from "react";
import { WeatherData } from '../../types';
import { SortType } from '../../types/enum';
import { Box, Typography } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { resultsSorter } from '../../utils/sorter.util'

type FavoritesProps = {
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
    handleDataChange: (data: WeatherData) => void;
};

export const Favorites: React.FC<FavoritesProps> = ({ favorites, setFavorites, handleDataChange }) => {
    const [ sort, setSort ] = React.useState(SortType.ASC)

    const removeFromFavorites = (name: string) => {
        const updatedFavorites = favorites.filter(favorite => favorite.name !== name);
        setFavorites(updatedFavorites)
    }

    return (
        <React.Fragment>
           <Box onClick={() => {
               console.log('sort', sort)
                    resultsSorter(favorites, sort)
                    setSort(sort === SortType.ASC ? SortType.DESC : SortType.ASC)
                }}
                sx={{ display: "flex", cursor: 'pointer'}}
                justifyContent='center'
            >
                {/* {sort === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 35, marginLeft: '20px'}}/> :  <ArrowDownwardIcon sx={{ fontSize: 35, marginLeft: '20px'}}/>} */}
                <Typography variant='h2' sx={{ fontSize: 35, marginBottom: '60px' }}>Favorited cities:</Typography>
            </Box>
           {favorites.length > 0 ? (
               favorites.map((favorite, i) => {
                return (
                    <Box sx={{ display: "flex"}} marginBottom='20px' key={i}>
                        <Box onClick={() => handleDataChange(favorite)}>
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