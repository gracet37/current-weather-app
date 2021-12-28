import React from "react";
import { WeatherData } from '../../types';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material'

type DetailsProps = {
    data: WeatherData;
    favorites: WeatherData[];
    setFavorites: (data: WeatherData[]) => void;
};

export const Details: React.FC<DetailsProps> = ({ data, favorites, setFavorites }) => {
console.log("🚀 ~ file: details.tsx ~ line 17 ~ data", data)
    const [ isSaved, setIsSaved ] = React.useState(false) 

    const cityQuery = data.name;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    React.useEffect(() => {
        if (favorites.length > 0) {
            console.log('faves', favorites)
            const check = favorites.find(favorite => favorite.name === cityQuery);
            console.log("🚀 ~ file: details.tsx ~ line 31 ~ React.useEffect ~ check", check)
            if (check) {
                setIsSaved(true)
            } else {
                setIsSaved(false)
            }
        } else {
            setIsSaved(false)
        }
    }, [favorites, data])

    const addToFavorites = (data: WeatherData) => {
        setFavorites([...favorites, data])
    }

    const removeFromFavorites = () => {
        const updatedFavorites = favorites.filter(favorite => favorite.name !== cityQuery);
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
            <Box maxWidth="500px" marginTop='50px' padding='20px'>
                <Box sx={{ display: "flex"}}>
                    <Typography variant='h2' sx={{ fontSize: 35, marginBottom: '60px' }}>Current weather in {cityQuery}</Typography>
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
        </React.Fragment>
    )
};