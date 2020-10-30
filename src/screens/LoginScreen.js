import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View>
      <TouchableOpacity onPress={() => console.log('hey')}>
        <Text>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
