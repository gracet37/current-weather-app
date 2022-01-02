/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Favorites, FavoritesProps } from './favorites';

describe('Favorites', () => {
    const defaultProps: FavoritesProps = {
        favorites: ['Auckland', 'New York', 'Shanghai'],
        setFavorites: () => {},
        handleDataChange: () => {}
    };

    test('renders all favorites onto the page', () => {
        render(<Favorites {...defaultProps} />);
        const elements = screen.getAllByTestId('favorite');
        expect(elements).toHaveLength(3);
    });
});
