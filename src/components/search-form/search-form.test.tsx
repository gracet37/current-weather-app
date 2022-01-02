import React from 'react';
import renderer from 'react-test-renderer';
import { SearchForm } from './search-form';

it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleInputChange = () => {};
    const tree = renderer
        .create(<SearchForm handleInputChange={handleInputChange} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
