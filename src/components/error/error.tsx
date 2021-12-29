import React from 'react';
import { Typography } from '@mui/material';

type ErrorProps = {
    error: string;
};

export const Error: React.FC<ErrorProps> = ({ error }) => {
    // switch case to add when there are additional known error messages
    const errorMessage = () => {
        switch (error) {
            case '404':
                return "On no! We could not find the city you're looking for. Please try again.";
            default:
                return 'Oh no! Something went wrong. Please try again.';
        }
    };
    return (
        <Typography variant="body1" sx={{ fontSize: 18 }}>
            {errorMessage()}
        </Typography>
    );
};
