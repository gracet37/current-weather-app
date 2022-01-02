import React from 'react';
import { WeatherData } from '../../types';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material';

type DetailsProps = {
    data: WeatherData;
    favorites: string[];
    setFavorites: (data: string[]) => void;
};

export const Details: React.FC<DetailsProps> = ({
    data,
    favorites,
    setFavorites
}) => {
    const [isSaved, setIsSaved] = React.useState(false);

    const cityName = data.name;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    React.useEffect(() => {
        if (favorites.length > 0) {
            const check = favorites.includes(cityName);
            if (check) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        } else {
            setIsSaved(false);
        }
    }, [favorites, data]);

    const addToFavorites = (data: string) => {
        setFavorites([...favorites, data]);
    };

    const removeFromFavorites = () => {
        const updatedFavorites = favorites.filter(
            (favorite) => favorite !== cityName
        );
        setFavorites(updatedFavorites);
        setIsSaved(false);
    };

    const handleClick = () => {
        if (isSaved) {
            removeFromFavorites();
        } else {
            addToFavorites(cityName);
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '40px',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontSize: 40, fontWeight: 500, marginRight: '20px' }}
                >
                    {cityName}
                </Typography>
                {isSaved ? (
                    <Box onClick={handleClick}>
                        <StarIcon
                            aria-label="saved to favorites"
                            sx={{
                                fontSize: 35
                            }}
                        />
                    </Box>
                ) : (
                    <Box onClick={handleClick}>
                        <StarBorderIcon
                            aria-label="add to favorites"
                            sx={{
                                fontSize: 35
                            }}
                        />
                    </Box>
                )}
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <ThermostatIcon sx={{ fontSize: 35, marginRight: '20px' }} />
                <Typography variant="body1" sx={{ fontSize: 24 }}>
                    Temperature: {temp}°C
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <AirIcon sx={{ fontSize: 35, marginRight: '20px' }} />
                <Typography variant="body1" sx={{ fontSize: 24 }}>
                    Wind Speed: {wind} m/s
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                <InvertColorsIcon sx={{ fontSize: 35, marginRight: '20px' }} />
                <Typography variant="body1" sx={{ fontSize: 24 }}>
                    Humidity: {humidity}%
                </Typography>
            </Box>
        </React.Fragment>
    );
};
