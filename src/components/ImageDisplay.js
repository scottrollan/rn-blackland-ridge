import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Overlay, Image } from 'react-native-elements';

export default function ImageDisplay({ imageURL }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />{' '}
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={styles.overlayStyles}
      >
        <Avatar style={styles.imageStyles} source={{ uri: `${imageURL}` }} />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayStyles: {
    padding: 15,
  },
  imageStyles: {
    height: 250,
    width: 250,
  },
});
