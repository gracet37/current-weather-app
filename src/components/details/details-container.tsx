import React from "react";
import { StateType } from '../../types/enum';
import { WeatherData } from '../../types';
import { Typography } from '@mui/material'
import { Details} from './details'

type DetailsContainerProps = {
    data: WeatherData;
    searchState: StateType;
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
};

export const DetailsContainer: React.FC<DetailsContainerProps> = ({ data, searchState, favorites, setFavorites }) => {
console.log("🚀 ~ file: details-container.tsx ~ line 15 ~ searchState", searchState)
    return (
        <React.Fragment>
            {searchState === StateType.ERROR && <Typography variant='body1' sx={{ fontSize: 24}}>error on details</Typography>}
            {searchState === StateType.LOADING && <Typography variant='body1' sx={{ fontSize: 24}}>loading on details</Typography>}
            {searchState === StateType.SUCCESS && data && <Details data={data} favorites={favorites} setFavorites={setFavorites}/>}
        </React.Fragment>
    )
};