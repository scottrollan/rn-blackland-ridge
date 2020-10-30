import React, { useState, useEffect } from 'react';
import ProfilePic from '../components/ProfilePic';
import ReactionRow from '../components/ReactionRow';
import { fetchMessages, builderImageUrl } from '../api/sanityClient';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Card, Icon, Tooltip } from 'react-native-elements';
import colors from '../styles';

const urlFor = (source) => {
  return builderImageUrl.image(source);
};

export default function DiscussionScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetchMessages();
        setMessages([...response]);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  return (
    <View style={styles.pageStyles}>
      <Text style={styles.headerStyles}>Disscussion Board</Text>
      <View style={{ width: '100%' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => message._id}
          data={messages}
          renderItem={({ item }) => {
            const imageURL = urlFor(item.avatar);
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
              <View
                style={{
                  width: '100%',
                  display: item.newThread ? 'flex' : 'none',
                }}
              >
                <Card style={styles.cardStyles}>
                  <View style={styles.cardTitleStyles}>
                    <ProfilePic imageURL={imageURL} />
                    <Text style={{ marginLeft: 10, fontSize: 20 }}>
                      {item.title}
                    </Text>
                  </View>
                  <Card.Divider />
                  <View style={styles.messageBodyStyles}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(p) => p._key}
                      data={item.message}
                      renderItem={({ item }) => {
                        return (
                          <Text style={{ marginVertical: 4 }}>
                            {item.children[0].text}
                          </Text>
                        );
                      }}
                    ></FlatList>
                  </View>
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
                  <Card.Divider />
                  <ReactionRow
                    id={item._id}
                    likedBy={item.likedBy}
                    lovedBy={item.lovedBy}
                    criedBy={item.criedBy}
                    laughedBy={item.laughedBy}
                  />
                </Card>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageStyles: {
    alignItems: 'center',
    width: '100%',
  },
  headerStyles: {
    fontSize: 25,
  },
  cardStyles: {
    display: 'flex',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 20,
    padding: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 5,
  },
  cardTitleStyles: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  likeStyles: {
    marginHorizontal: 5,
  },
  interactions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
