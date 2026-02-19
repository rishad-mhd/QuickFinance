import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export enum StorageKeys {
  THEME_MODE = 'theme_mode',
  LOAN_HISTORY = 'loan_history',
  GST_HISTORY = 'gst_history',
}

export const setItem = (key: StorageKeys, value: string) => {
  storage.set(key, value);
};

export const getItem = (key: StorageKeys): string | undefined => {
  return storage.getString(key);
};

export const removeItem = (key: StorageKeys) => {
  storage.remove(key);
};
