import { act, render } from '@testing-library/react-native';
import React from 'react';
import { getBeers } from '../../apiService.js';
import ProfileScreen from '../../screens/ProfileScreen';
import mockApiRes from '../mock-data/beer-list-response.json';
jest.mock('../../apiService');

// getBeers.mockResolvedValue(mockApiRes);
const UseEffect = ({ callback }) => {
  React.useEffect(callback);
  return null;
};

describe('Profile unit test', () => {
  // eslint-disable-next-line jest/no-focused-tests

  // test('render should trigger useEffect', () => {
  //   const effectCallback = jest.fn();
  //   render(<UseEffect callback={effectCallback} />);
  //   expect(effectCallback).toHaveBeenCalledTimes(1);
  // });
  it('Check for to see item count', async () => {
    // jest.mock('react-native-gesture-handler', () => {
    //   // eslint-disable-next-line global-require
    //   const View = require('react-native/Libraries/Components/View/View');
    //   return {
    //     Swipeable: View,
    //     DrawerLayout: View,
    //     State: {},
    //     ScrollView: View,
    //     Slider: View,
    //     Switch: View,
    //     TextInput: View,
    //     ToolbarAndroid: View,
    //     ViewPagerAndroid: View,
    //     DrawerLayoutAndroid: View,
    //     WebView: View,
    //     NativeViewGestureHandler: View,
    //     TapGestureHandler: View,
    //     FlingGestureHandler: View,
    //     ForceTouchGestureHandler: View,
    //     LongPressGestureHandler: View,
    //     PanGestureHandler: View,
    //     PinchGestureHandler: View,
    //     RotationGestureHandler: View,
    //     TouchableOpacity: View,
    //     /* Buttons */
    //     RawButton: View,
    //     BaseButton: View,
    //     RectButton: View,
    //     BorderlessButton: View,
    //     /* Other */
    //     FlatList: View,
    //     gestureHandlerRootHOC: jest.fn(),
    //     Directions: {},
    //   };
    // });
    const apiRsponsePromise = Promise.resolve(mockApiRes);
    getBeers.mockResolvedValue(apiRsponsePromise);
    // getBeers = jest.fn(() => apiRsponsePromise);
    const { getByTestId, queryByTestId, getByText, getByA11yHint } = render(
      <ProfileScreen />,
    );
    // const json = render(<ProfileScreen />).toJSON(5);
    // console.log(json);
    // const loading = await waitFor(() => getByTestId('loading'));
    expect(getByTestId('loading')).not.toBeEmpty();
    expect(queryByTestId('loading')).toHaveTextContent('Loading...');
    expect(getBeers).toHaveBeenCalledTimes(1);

    await act(() => apiRsponsePromise);
    await expect(getByText(mockApiRes.data.beers[0].beer_name));
    await expect(getByText(mockApiRes.data.beers[1].beer_name));
  });
});
