import * as React from 'react';
import { AppRegistry } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import App from './src/App';
import { name as appName } from './app.json';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    secondary: '#BBDEFB',
    primaryContainer: '#2196F3',
    onPrimaryContainer: '#FFFFFF',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={{ ...theme, dark: false }}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
