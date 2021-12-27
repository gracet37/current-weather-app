import './App.css';
import React from 'react';
import { SearchForm } from './components/search-form';
import { Box, Typography } from '@mui/material';
import { StateType } from './types/enum';
import { Details } from './components/details';
import { Favorites } from './components/favorites'


const App: React.FC = () => {

  const [ cityName, setCityName ] = React.useState('auckland')
  const [ searchState, setSearchState ] = React.useState(StateType.LOADING);
  const [ data, setData ] = React.useState();
  const [ error, setError ] = React.useState();
  const [ favorites, setFavorites ] = React.useState([]);

  const cityWeatherSearch = (cityName: string) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
          setSearchState(StateType.SUCCESS);
          setData(data)
      })
      .catch(err => {
        console.log('am i hit')
          setSearchState(StateType.ERROR);
          setError(err)
      })
  }

// TODO: Make sure all input is lowercase
  const handleChange = (e: any) => {
      // const value = e.target.value;
      // setCityName(value)
      console.log(cityName)
      // _debounce(cityWeatherSearch(cityName), 500)
  }

  React.useEffect(() => {
      cityWeatherSearch(cityName)
  }, [])

  console.log('fave', favorites)

  return (
    <Box>
      <Typography variant="h1" fontSize="50px">Current weather city search</Typography>
      <SearchForm handleChange={handleChange} />
      <Details data={data} searchState={searchState} favorites={favorites} setFavorites={setFavorites} />
      <Favorites favorites={favorites} setFavorites={setFavorites}/>
    </Box>
  );
}

export default App;
