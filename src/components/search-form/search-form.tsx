import React from "react";
import { TextField } from '@mui/material';
// import _debounce from 'lodash/debounce';
import { StateType } from '../../types/enum';

type SearchFormProps = {
    handleChange: (input: string ) => void;
}


export const SearchForm: React.FC<SearchFormProps> = ({ handleChange }) => {
    const [ cityName, setCityName ] = React.useState('AUCKLAND')
    const [ searchState, setSearchState ] = React.useState(StateType.LOADING);
    const [ data, setData ] = React.useState();
    const [ error, setError ] = React.useState();
    const API = '3abca31956418abc280b7c4c63111874';

    // useEffect runs when query changes
    // API KEY = 3abca31956418abc280b7c4c63111874

    // const cityWeatherSearch = (cityName: string) => {
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'3abca31956418abc280b7c4c63111874'}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setSearchState(StateType.SUCCESS);
    //         setData(data)
    //     })
    //     .catch(err => {
    //         setSearchState(StateType.ERROR);
    //         setError(err)
    //     })
    // }

    // console.log(data)

    // const handleChange = (e: any) => {
    //     // const value = e.target.value;
    //     // setCityName(value)
    //     console.log(cityName)
    //     // _debounce(cityWeatherSearch(cityName), 500)
    // }

    // React.useEffect(() => {
    //     cityWeatherSearch(cityName)
    // }, [cityName])

    return (
        <React.Fragment>
            <TextField aria-label="city search input" id="outlined-basic" label="City search" variant="outlined" onChange={(e) => handleChange(e.target.value)}/>
        </React.Fragment>
    )
};