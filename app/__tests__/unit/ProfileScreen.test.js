import { render } from '@testing-library/react-native';
import React from 'react';
// import { getBeers } from '../../apiService.js';
import { ProfileScreen } from '../../screens/ProfileScreen';
jest.mock('../../apiService');
// const mockApiRes = import('../mock-data/beer-list-response.json');

// getBeers.mockResolvedValue(mockApiRes);

describe('Profile unit test', () => {
  // eslint-disable-next-line jest/no-focused-tests
  it.only('Check for to see item count', () => {
    render(<ProfileScreen />);
    // expect(screen.getByText('Loading...').toBeInTheDocument());
  });
});
