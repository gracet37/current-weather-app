import React from 'react';
import { StateType } from '../../types/enum';
import { WeatherData } from '../../types';
import { CircularProgress, Box, Typography } from '@mui/material';
import { Details } from './details';
import { Error } from '../error';

type DetailsContainerProps = {
    data: WeatherData;
    searchState: StateType;
    favorites: string[];
    setFavorites: (data: string[]) => void;
    error: string;
};

export const DetailsContainer: React.FC<DetailsContainerProps> = ({
    data,
    error,
    searchState,
    favorites,
    setFavorites
}) => {
    return (
        <Box
            minHeight="250px"
            marginY="50px"
            padding="50px"
            sx={{ border: '1px solid grey', borderRadius: '3px' }}
        >
            {searchState === StateType.PENDING && (
                <Typography variant="body1" sx={{ color: '#919191' }}>
                    Results will show here
                </Typography>
            )}
            {searchState === StateType.ERROR && <Error error={error} />}
            {searchState === StateType.LOADING && (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            )}
            {searchState === StateType.SUCCESS && data && (
                <Details
                    data={data}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
            )}
        </Box>
    );
};
