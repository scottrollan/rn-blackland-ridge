import colors from '../styles';
const reactions = [
  {
    title: 'likes',
    icon: 'thumbs-up',
    color: colors.facebookBlue,
    label: 'Liked',
    array: 'likedBy',
  },
  {
    title: 'loves',
    icon: 'heart',
    color: colors.googleRed,
    label: 'Loved',
    array: 'lovedBy',
  },
  {
    title: 'laughs',
    icon: 'laugh',
    color: colors.cautionOrange,
    label: 'Haha',
    array: 'laughedBy',
  },
  {
    title: 'cries',
    icon: 'sad-tear',
    color: colors.cautionYellow,
    label: 'Sad',
    array: 'criedBy',
  },
];

export default reactions;
