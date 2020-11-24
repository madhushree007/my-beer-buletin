import { render } from '@testing-library/react-native';
import React from 'react';
import { getBeers } from '../../apiService.js';
import ProfileScreen from '../../screens/ProfileScreen';
import mockApiRes from '../mock-data/beer-list-response.json';
jest.mock('../../apiService');
// const mockApiRes = import('../mock-data/beer-list-response.json');

getBeers.mockResolvedValue(mockApiRes);
const UseEffect = ({ callback }) => {
  React.useEffect(callback);
  return null;
};

describe('Profile unit test', () => {
  // eslint-disable-next-line jest/no-focused-tests

  test('render should trigger useEffect', () => {
    const effectCallback = jest.fn();
    render(<UseEffect callback={effectCallback} />);
    expect(effectCallback).toHaveBeenCalledTimes(1);
  });
  it('Check for to see item count', () => {
    const { getByTestId, queryByTestId, getByText } = render(<ProfileScreen />);
    // const loading = await waitFor(() => getByTestId('loading'));
    expect(getByTestId('loading')).not.toBeEmpty();
    expect(queryByTestId('loading')).toHaveTextContent('Loading...');
    expect(getBeers).toHaveBeenCalledTimes(1);
    // mockApiRes.data.beers.forEach(beer =>
    //   expect(getByTestId(beer.bid).not.toBeEmpty()),
    // );
  });
});
