import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UserContext from '../context/UserContext';
import colors from '../styles';

export default function HomeScreen({ navigation }) {
  // const thisUser = useContext(UserContext);
  const thisUser = '';
  const name = thisUser.name;
  return (
    <View style={styles.pageStyles}>
      <Text
        style={{
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          marginVertical: 20,
          display: thisUser ? 'flex' : 'none',
          color: colors.defaultFontColor,
        }}
      >
        Welcome, {name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Directory')}
        style={styles.buttonStyles}
      >
        <Text style={styles.buttonTextStyles}>Directory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Discussion')}
        style={styles.buttonStyles}
      >
        <Text style={styles.buttonTextStyles}>Discussion</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Loading')}
        style={styles.buttonStyles}
      >
        <Text style={styles.buttonTextStyles}>Loading</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Zillow')}
        style={styles.buttonStyles}
      >
        <Text style={styles.buttonTextStyles}>Homes by Zillow</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', display: thisUser ? 'none' : 'flex' }}>
        <TouchableOpacity
          style={styles.lastButtonStyles}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ fontSize: 20, color: colors.defaultFontColor }}>
            Login To See More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageStyles: {
    minHeight: '100%',
  },
  buttonStyles: {
    backgroundColor: colors.green,
    marginVertical: 6,
    marginHorizontal: 15,
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  lastButtonStyles: {
    backgroundColor: colors.accent,
    marginVertical: 20,
    marginHorizontal: 15,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTextStyles: {
    color: colors.white,
    fontSize: 16,
  },
});
