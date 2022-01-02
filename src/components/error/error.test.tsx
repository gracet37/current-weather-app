import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from './error';

describe('Error', () => {
    test('renders the correct text when error is status 404', () => {
        const props = { error: '404' };
        render(<Error {...props} />);
        const element = screen.getByTestId('error');
        expect(element.textContent).toEqual(
            expect.stringContaining(
                "On no! We could not find the city you're looking for. Please try again."
            )
        );
    });
    test('renders the correct text for non status 404 errors', () => {
        const props = { error: '400' };
        render(<Error {...props} />);
        const element = screen.getByTestId('error');
        expect(element.textContent).toEqual(
            expect.stringContaining(
                'Oh no! Something went wrong. Please try again.'
            )
        );
    });
});
