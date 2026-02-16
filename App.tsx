import React from 'react';
import { ThemeProvider } from './src/theme/ThemeContext';
import { TabNavigation } from './src/app/TabNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <TabNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
