import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  View,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native'

import { fetchLocationId, fetchWeather } from './src/utils/api'
import getImageForWeather from './src/utils/getImageForWeather'

import { SearchInput } from './src/components/SearchInput'

export interface AppState {
  loading: boolean;
  error: boolean;
  location: string;
  temperature: number;
  weather: string;
}

const initialState = {
  loading: false,
  error: false,
  location: '',
  temperature: 0,
  weather: '',
}

export const App = () => {

  const [state, setState] = useState<AppState>(initialState);
  const { loading, error, location, temperature, weather } = state;

  useEffect(() => {
    handleUpdateLocation('San Francisco');
    console.log('Se ha modificado el estado');
  }, []);

  const handleUpdateLocation = async(city: string) => {
    if (!city) return;

    try {
      setState({ ...state, loading: true });
      const locationId = await fetchLocationId(city);
      const {location, weather, temperature} = await fetchWeather(locationId);

      setState({
        loading: false,
        error: false,
        location,
        weather,
        temperature,
      });
    } catch (e) {
      setState({
        ...state,
        loading: false,
        error: true,
      });
    }

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        resizeMode="cover">
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />

          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}

              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}

              <SearchInput
                setLocation={handleUpdateLocation}
                placeholder="Search any city"
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    // fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});