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

    const sortedArray = React.useMemo(() => {
        return resultsSorter(favorites, sort)
    }, [sort, favorites])

    return (
        <Box marginY='50px' padding='50px' sx={{ border: '1px solid grey', borderRadius: '3px'}}>
           <Box onClick={() => {
                    setSort(sort === SortType.ASC ? SortType.DESC : SortType.ASC)
                    resultsSorter(favorites, sort)
                }}
                sx={{ display: "flex", cursor: 'pointer'}}
                justifyContent='center'
            >
                <Typography variant='h2' sx={{ fontSize: 35, marginBottom: '60px' }}>Favorited cities:</Typography>
                {sort === SortType.ASC ? <ArrowUpwardIcon sx={{ fontSize: 35, marginLeft: '20px'}}/> :  <ArrowDownwardIcon sx={{ fontSize: 35, marginLeft: '20px'}}/>}
            </Box>
           {sortedArray.length > 0 ? (
               sortedArray.map((favorite, i) => {
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
            <Typography variant='body1' sx={{ fontSize: 18, color: '#919191'}}>You do not have any saved cities</Typography>
           )
        }
        </Box>
    )
};