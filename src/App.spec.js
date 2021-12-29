// import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// test('renders App', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
