import React, { useReducer } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles';

const reactionReducer = (state, action) => {
  switch (action.type) {
    case 'like':
      return { ...state, liked: !state.liked };
    case 'cry':
      return { ...state, cried: !state.cried };
    case 'love':
      return { ...state, loved: !state.loved };
    case 'laugh':
      return { ...state, laughed: !state.laughed };
    default:
      return state;
  }
};

export default function ReactionRow({
  id,
  likedBy,
  lovedBy,
  criedBy,
  laughedBy,
}) {
  const [state, dispatch] = useReducer(reactionReducer, {
    liked: likedBy ? true : false,
    loved: lovedBy ? true : false,
    cried: criedBy ? true : false,
    laughed: laughedBy ? true : false,
  });

  const toggle = (reaction) => {
    dispatch({ type: reaction });
  };

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      <TouchableOpacity onPress={() => toggle('like')}>
        <Icon
          name="thumbs-up"
          type="font-awesome-5"
          color={state.liked ? colors.facebookBlue : '#999999'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggle('love')}>
        <Icon
          style={{ marginHorizontal: 5 }}
          name="heart"
          solid
          type="font-awesome-5"
          color={state.loved ? colors.googleRed : '#999999'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggle('cry')}>
        <Icon
          style={{ marginHorizontal: 5 }}
          name="sad-tear"
          type="font-awesome-5"
          color={state.cried ? colors.cautionOrange : '#999999'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggle('laugh')}>
        <Icon
          style={{ marginHorizontal: 5 }}
          name="laugh"
          type="font-awesome-5"
          color={state.laughed ? colors.cautionYellow : '#999999'}
        />
      </TouchableOpacity>
    </View>
  );
}
