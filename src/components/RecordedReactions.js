import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tooltip, Icon } from 'react-native-elements';
import colors from '../styles';

export default function RecordedReactions({ item }) {
  const weLike = item.likedBy;
  let likes;
  if (weLike) {
    likes = weLike.length;
  }
  const weLove = item.lovedBy;
  let loves;
  if (weLove) {
    loves = weLove.length;
  }

  const weLaugh = item.laughedBy;
  let laughs;
  if (weLaugh) {
    laughs = weLaugh.length;
  }

  const weCry = item.criedBy;
  let crys;
  if (weCry) {
    crys = weCry.length;
  }
  return (
    <View style={styles.interactions}>
      <Tooltip popover={<Text>{likes} Likes</Text>}>
        <Icon
          style={{ display: likes > 0 ? 'flex' : 'none' }}
          name="thumbs-up"
          type="font-awesome-5"
          color={colors.facebookBlue}
        ></Icon>
      </Tooltip>
      <Tooltip popover={<Text>{loves} Loves</Text>}>
        <Icon
          style={{ display: loves > 0 ? 'flex' : 'none' }}
          name="heart"
          solid
          type="font-awesome-5"
          color={colors.googleRed}
        ></Icon>
      </Tooltip>
      <Tooltip popover={<Text>{crys} Sad Faces</Text>}>
        <Icon
          style={{ display: crys > 0 ? 'flex' : 'none' }}
          name="sad-tear"
          type="font-awesome-5"
          color={colors.cautionOrange}
        ></Icon>
      </Tooltip>
      <Tooltip popover={<Text>{laughs} Haha's</Text>}>
        <Icon
          style={{ display: laughs > 0 ? 'flex' : 'none' }}
          name="laugh"
          type="font-awesome-5"
          color={colors.cautionYellow}
        ></Icon>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  interactions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
