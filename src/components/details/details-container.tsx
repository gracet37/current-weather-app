import React from "react";
import { StateType } from '../../types/enum';
import { WeatherData } from '../../types';
import { CircularProgress, Typography } from '@mui/material';
import { Details} from './details';
import { Error } from '../error';

type DetailsContainerProps = {
    data: WeatherData;
    searchState: StateType;
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
    error: string;
};

export const DetailsContainer: React.FC<DetailsContainerProps> = ({ data, error, searchState, favorites, setFavorites }) => {
console.log("🚀 ~ file: details-container.tsx ~ line 15 ~ searchState", searchState)
    return (
        <React.Fragment>
            {searchState === StateType.ERROR && <Error error={error} />}
            {searchState === StateType.LOADING && <CircularProgress />}
            {searchState === StateType.SUCCESS && data && <Details data={data} favorites={favorites} setFavorites={setFavorites}/>}
        </React.Fragment>
    )
};