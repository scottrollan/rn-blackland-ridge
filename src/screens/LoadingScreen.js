import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(() => {
        if (user) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      });
    };
    checkIfLoggedIn();
  }, []);
  return (
    <View style={styles.pageStyles}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  pageStyles: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
