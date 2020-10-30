import React, { useState } from 'react';
import {
  View,
  TouchableOpactiy,
  Text,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../styles';

export default function Accordion({ data }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpactiy style={styles.row} onPress={() => toggleExpand()}>
        <Text>TESTING</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          type="font-awesome-5"
          color={state.liked ? colors.facebookBlue : '#999999'}
        />
      </TouchableOpactiy>
      <View style={styles.parentHr}>
        {expanded && 
        <View style={styles.child}>
         <Text>DATA WILL GO HERE, PROBABLY IN A FLATLIST</Text>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.overlayLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.CGRAY,
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%',
  },
  child: {
    backgroundColor: Colors.LIGHTGRAY,
    padding: 16,
  },
});
