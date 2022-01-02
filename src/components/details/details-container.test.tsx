import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailsContainer, DetailsContainerProps } from './details-container';
import { StateType } from '../../types/enum';
import { WeatherData } from '../../types';
import { mockData } from '../../__fixtures__/data';

describe('DetailsContainer', () => {
    const defaultProps = {
        data: {} as WeatherData,
        favorites: [] as string[],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setFavorites: (): void => {},
        error: ''
    };

    test('renders the correct text when search is in pending state', () => {
        const props = {
            ...defaultProps,
            searchState: StateType.PENDING
        } as DetailsContainerProps;
        render(<DetailsContainer {...props} />);
        const element = screen.getByTestId('pending');
        expect(element.textContent).toEqual(
            expect.stringContaining('Results will show here')
        );
    });

    test('renders the loading spinner when search is in loading state', () => {
        const props = {
            ...defaultProps,
            searchState: StateType.LOADING
        } as DetailsContainerProps;
        render(<DetailsContainer {...props} />);
        const element = screen.getByTestId('loading');
        expect(element).toBeTruthy();
    });

    test('renders the correct text when search is in error state', () => {
        const props = {
            ...defaultProps,
            error: '404',
            searchState: StateType.ERROR
        } as DetailsContainerProps;
        render(<DetailsContainer {...props} />);
        const element = screen.getByTestId('error');
        expect(element.textContent).toEqual(
            expect.stringContaining(
                "On no! We could not find the city you're looking for. Please try again."
            )
        );
    });

    test('renders the details component when search is in success state', () => {
        const props = {
            ...defaultProps,
            data: mockData,
            searchState: StateType.SUCCESS
        } as DetailsContainerProps;
        render(<DetailsContainer {...props} />);
        const element = screen.getByTestId('details');
        expect(element).toBeTruthy();
    });
});
