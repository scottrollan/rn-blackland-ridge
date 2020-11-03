import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function ImageDisplay({ imageURL, height, width }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={{ display: imageURL.options.source ? 'flex' : 'none' }}>
      <TouchableOpacity onPress={toggleOverlay}>
        <Image
          style={{ height: height, width: width }}
          source={{ uri: `${imageURL}` }}
          resizeMethod="scale"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={styles.overlayStyles}
      >
        <Image
          style={{ minWidth: '90%', minHeight: '75%' }}
          source={{ uri: `${imageURL}` }}
          resizeMethod="scale"
          resizeMode="contain"
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayStyles: {
    padding: 15,
  },
});
