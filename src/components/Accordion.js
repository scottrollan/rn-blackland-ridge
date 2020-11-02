import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Accordion({ itemLeft, data }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={() => toggleExpand()}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* <View onPress={(e) => e.stopPropagation()}>{itemLeft}</View> */}
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          type="font-awesome-5"
        />
      </TouchableOpacity>
      <View style={{ display: expanded ? 'flex' : 'none' }}>
        <Text>{data}</Text>
      </View>
    </View>
  );
}
