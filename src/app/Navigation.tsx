import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { LoanScreen } from '../screens/LoanScreen';
import { GSTScreen } from '../screens/GSTScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from '../components/Text';

const Stack = createNativeStackNavigator();

const HeaderRight = ({ navigation }: any) => {
  const { theme } = useTheme();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Loan')}
        style={styles.headerBtn}
      >
        <Text variant="label" color={theme.colors.primary}>
          Loan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('GST')}
        style={styles.headerBtn}
      >
        <Text variant="label" color={theme.colors.primary}>
          GST
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text variant="label" color={theme.colors.primary}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const AppNavigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            ...theme.typography.titleMedium,
          },
          headerShadowVisible: false,
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Loan"
          component={LoanScreen}
          options={{ title: 'Loan EMI' }}
        />
        <Stack.Screen
          name="GST"
          component={GSTScreen}
          options={{ title: 'GST Calculator' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
  headerBtn: {
    marginRight: 15,
  },
});
