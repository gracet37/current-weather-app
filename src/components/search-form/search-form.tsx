import React from 'react';
import { TextField } from '@mui/material';

type SearchFormProps = {
    handleInputChange: (input: string) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({
    handleInputChange
}) => {
    return (
        <TextField
            aria-label="city search input"
            fullWidth
            id="outlined-basic"
            label="City name"
            variant="outlined"
            onChange={(e) => handleInputChange(e.target.value)}
        />
    );
};
