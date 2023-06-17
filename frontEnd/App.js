import React, { Component } from 'react';
import AppNavigator from './src/navigations/Navigator'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  MaskedView,
} from 'react-native';

export default function App() {
  return(
 <AppNavigator />

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

