import './App.css';
import React from 'react';
import { SearchForm } from './components/search-form';
import { Box, Typography } from '@mui/material';
import { StateType } from './types/enum';
import { DetailsContainer } from './components/details';
import { Favorites } from './components/favorites'
import { WeatherData } from './types';



const App: React.FC = () => {

  const [ cityQuery, setCityQuery ] = React.useState<string>('')
  const [ searchState, setSearchState ] = React.useState(StateType.LOADING);
  const [ data, setData ] = React.useState<WeatherData>();
  const [ error, setError ] = React.useState();
  const [ favorites, setFavorites ] = React.useState<WeatherData[]>([]);

  const cityWeatherSearch = (cityQuery: string) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
        setSearchState(StateType.SUCCESS);
        setData(data)
    })
    .catch(err => {
        setSearchState(StateType.ERROR);
        setError(err)
    })
}

  React.useEffect(() => {
    if (cityQuery) {
       const timeOutId = setTimeout(() => cityWeatherSearch(cityQuery), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [cityQuery]);

  const handleInputChange = (value: string) => {
    const formattedValue = value.toLowerCase();
    setCityQuery(formattedValue)
  };

  const handleDataChange = (cityData: WeatherData) => {
    cityWeatherSearch(cityData.name)
  }


  return (
    <Box>
      <Typography variant="h1" fontSize="50px">Current weather city search</Typography>
      <SearchForm handleInputChange={handleInputChange} />
      <DetailsContainer data={data} searchState={searchState} favorites={favorites} setFavorites={setFavorites} />
      <Favorites favorites={favorites} setFavorites={setFavorites} handleDataChange={handleDataChange}/>
    </Box>
  );
}

export default App;
