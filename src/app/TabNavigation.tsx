import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { BlurView } from '@sbaiahmed1/react-native-blur';

import { useTheme } from '../theme/ThemeContext';
import { Text } from '../components/Text';

import { LoanScreen } from '../screens/LoanScreen';
import { GSTScreen } from '../screens/GSTScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

// Define tab configuration separately to avoid TS errors in Navigation options
const Tab = createBottomTabNavigator();

const TAB_CONFIG: Record<string, { activeIcon: string; inactiveIcon: string }> =
  {
    Loan: { activeIcon: 'calculator', inactiveIcon: 'calculator-outline' },
    GST: { activeIcon: 'cash', inactiveIcon: 'cash-outline' },
    Settings: { activeIcon: 'settings', inactiveIcon: 'settings-outline' },
  };

type TabItemProps = {
  isFocused: boolean;
  onPress: () => void;
  label: string;
  theme: any;
  activeIcon: string;
  inactiveIcon: string;
};

const TabItem = ({
  isFocused,
  onPress,
  label,
  theme,
  activeIcon,
  inactiveIcon,
}: TabItemProps) => {
  const iconAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(isFocused ? 1.1 : 1, {
          duration: 250,
        }),
      },
      {
        translateY: withTiming(isFocused ? -5 : 0, {
          duration: 250,
        }),
      },
    ],
  }));

  const activeBgStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
    transform: [{ scale: withTiming(isFocused ? 1 : 0.7, { duration: 250 }) }],
  }));

  const activeIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
  }));

  const inactiveIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 0 : 1, { duration: 200 }),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
    transform: [
      { translateY: withTiming(isFocused ? 0 : 5, { duration: 200 }) },
    ],
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.tabItem}
    >
      <View style={styles.iconWrapper}>
        <Animated.View style={[styles.iconContainer, iconAnimation]}>
          <Animated.View
            style={[
              styles.activeBackground,
              { backgroundColor: theme.colors.primary + '15' },
              activeBgStyle,
            ]}
          />

          <View style={styles.iconInner}>
            <Animated.View style={[StyleSheet.absoluteFill, activeIconStyle]}>
              <Icon name={activeIcon} size={24} color={theme.colors.primary} />
            </Animated.View>

            <Animated.View style={[StyleSheet.absoluteFill, inactiveIconStyle]}>
              <Icon
                name={inactiveIcon}
                size={24}
                color={theme.colors.textSecondary}
              />
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.labelContainer, labelStyle]}>
          <Text
            variant="label"
            style={[
              styles.labelText,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            {label}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation, theme }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.glassWrapper}>
        <BlurView
          style={styles.blur}
          blurAmount={30}
          blurType={theme.isDark ? 'dark' : 'light'}
        />

        <View style={styles.tabContent}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;
            const iconConfig = TAB_CONFIG[route.name] || {
              activeIcon: 'alert',
              inactiveIcon: 'alert-outline',
            };

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabItem
                key={route.key}
                isFocused={isFocused}
                onPress={onPress}
                label={label}
                theme={theme}
                activeIcon={iconConfig.activeIcon}
                inactiveIcon={iconConfig.inactiveIcon}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export const TabNavigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} theme={theme} />}
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTitleStyle: {
            ...theme.typography.titleMedium,
            color: theme.colors.text,
          },
        }}
      >
        <Tab.Screen
          name="Loan"
          component={LoanScreen}
          options={{
            title: 'Loan',
          }}
        />

        <Tab.Screen
          name="GST"
          component={GSTScreen}
          options={{
            title: 'GST',
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  glassWrapper: {
    width: '92%',
    height: 72,
    borderRadius: 36,
    // Removed overflow: 'hidden' to allow icon animations to expand outside if necessary
    // Note: BlurView still works as it is positioned absolutely within
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36,
  },

  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconInner: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeBackground: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  labelContainer: {
    marginTop: -2,
    height: 14,
  },

  labelText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
