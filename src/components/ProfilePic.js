import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Overlay, Avatar } from 'react-native-elements';

export default function ProfilePic({ profileURL }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <Avatar rounded source={{ uri: `${profileURL}` }} />
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={styles.overlayStyles}
      >
        <Avatar style={styles.imageStyles} source={{ uri: `${profileURL}` }} />
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
