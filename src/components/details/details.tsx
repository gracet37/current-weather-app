import React from "react";
import { StateType } from '../../types/enum';
import { WeatherData } from '../../types';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material'

type DetailsProps = {
    data: WeatherData;
    searchState: StateType;
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
};

export const Details: React.FC<DetailsProps> = ({ data, searchState, favorites, setFavorites }) => {
    const [ isSaved, setIsSaved ] = React.useState(false) 

    // if (searchState === StateType.ERROR) {
    //     return <Typography variant='body1' sx={{ fontSize: 24}}>Oh no! We could not find any results for your city. Please try again. </Typography>
    // }

    // if (searchState === StateType.LOADING) {
    //     return <Typography variant='body1' sx={{ fontSize: 24}}>Im loading </Typography>
    // }

    console.log(data, searchState)
    const cityName = data.name;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    React.useEffect(() => {
        if (favorites.length > 0) {
            const check = favorites.find(favorite => favorite.name === cityName);
            if (check) {
                setIsSaved(true)
            }
        } else {
            setIsSaved(false)
        }
    }, [favorites])

    const addToFavorites = (data: WeatherData) => {
        setFavorites([...favorites, data])
    }

    const removeFromFavorites = () => {
        const updatedFavorites = favorites.filter(favorite => favorite.name !== cityName);
        setFavorites(updatedFavorites)
        setIsSaved(false)
    }

    const handleClick = () => {
        if (isSaved) {
            removeFromFavorites()
        } else {
            console.log('hi')
            addToFavorites(data)
        }
    }



    return (
        <React.Fragment>
            {searchState === StateType.SUCCESS && (
                <Box>
                    <Box maxWidth="500px" marginTop='50px' padding='20px'>
                        <Box sx={{ display: "flex"}}>
                            <Typography variant='h2' sx={{ fontSize: 35, marginBottom: '60px' }}>Current weather in {cityName}</Typography>
                            {isSaved ? (
                                <Box onClick={handleClick}>
                                    <StarIcon sx={{ fontSize: 35, marginLeft: '20px', cursor: 'pointer'}}/>
                                </Box>
                            ) : 
                            (
                                <Box onClick={handleClick}>
                                    <StarBorderIcon sx={{ fontSize: 35, marginLeft: '20px', cursor: 'pointer'}}/>
                                </Box>
                            )
                            }
                        </Box>
                        <Box sx={{ display: "flex"}} marginBottom='20px'>
                            <ThermostatIcon sx={{ fontSize: 35, marginRight: '20px'}}/>
                            <Typography variant='body1' sx={{ fontSize: 24}}>Temperature: {temp}°C</Typography>
                        </Box>
                        <Box sx={{ display: "flex"}} marginBottom='20px'>
                            <AirIcon sx={{ fontSize: 35, marginRight: '20px'}}/>
                            <Typography variant='body1' sx={{ fontSize: 24}}>Wind Speed: {wind} m/s</Typography>
                        </Box>
                        <Box sx={{ display: "flex"}} marginBottom='20px'>
                            <InvertColorsIcon sx={{ fontSize: 35, marginRight: '20px'}}/>
                            <Typography variant='body1' sx={{ fontSize: 24}}>Humidity: {humidity}%</Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </React.Fragment>
    )
};