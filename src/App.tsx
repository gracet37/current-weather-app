import './App.css';
import React from 'react';
import { SearchForm } from './components/search-form';
import { Box, Typography } from '@mui/material';
import { StateType } from './types/enum';
import { DetailsContainer } from './components/details';
import { Favorites } from './components/favorites';
import { WeatherData } from './types';

const App: React.FC = () => {
    const [cityQuery, setCityQuery] = React.useState<string>('');
    const [searchState, setSearchState] = React.useState<StateType>(
        StateType.PENDING
    );
    const [data, setData] = React.useState<WeatherData>();
    const [error, setError] = React.useState<string>();
    const [favorites, setFavorites] = React.useState<string[]>([]);

    React.useEffect(() => {
        let localStorageValue;
        const localStorageCheck = localStorage.getItem('favorite-cities');
        if (localStorageCheck) {
            localStorageValue = JSON.parse(
                localStorage.getItem('favorite-cities')
            );
            setFavorites(localStorageValue);
        }
    }, []);

    React.useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem('favorite-cities', JSON.stringify(favorites));
        }
    }, [favorites]);

    const cityWeatherSearch = (cityQuery: string) => {
        setSearchState(StateType.LOADING);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    setSearchState(StateType.SUCCESS);
                    setData(data);
                } else {
                    setSearchState(StateType.ERROR);
                    setError(data.cod);
                }
            })
            .catch((err) => {
                setSearchState(StateType.ERROR);
                setError(err.cod);
            });
    };

    React.useEffect(() => {
        if (cityQuery) {
            const timeOutId = setTimeout(
                () => cityWeatherSearch(cityQuery),
                2000
            );
            return () => clearTimeout(timeOutId);
        }
    }, [cityQuery]);

    const handleInputChange = (value: string) => {
        const formattedValue = value.toLowerCase();
        setCityQuery(formattedValue);
    };

    const handleDataChange = (cityData: string) => {
        cityWeatherSearch(cityData);
    };

    return (
        <Box className="app-container">
            <Typography variant="h1" fontSize="50px" marginBottom="30px">
                Current weather in ...
            </Typography>
            <SearchForm handleInputChange={handleInputChange} />
            <DetailsContainer
                data={data}
                searchState={searchState}
                favorites={favorites}
                setFavorites={setFavorites}
                error={error}
            />
            <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                handleDataChange={handleDataChange}
            />
        </Box>
    );
};

export default App;
