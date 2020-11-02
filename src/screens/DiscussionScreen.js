import React, { useState, useEffect } from 'react';
import ProfilePic from '../components/ProfilePic';
import ReactionRow from '../components/ReactionRow';
import { createParsedDate } from '../functions/CreateParsedDate';
import {
  fetchMessages,
  fetchSingleMessage,
  builderImageUrl,
} from '../api/sanityClient';
import { createRandomString } from '../functions/CreateRandomString';
import { sortByCreatedAt } from '../functions/SortDates';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card, Icon, Tooltip, Overlay, Avatar } from 'react-native-elements';
import colors from '../styles';

const urlFor = (source) => {
  return builderImageUrl.image(source);
};

export default function DiscussionScreen() {
  const [messages, setMessages] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchNewThreads = async () => {
      try {
        const response = await fetchMessages();
        // setMessages(response);

        let newThreads = response.filter((mess) => mess.newThread);
        newThreads.forEach((m) => {
          if (m.responses) {
            let replyArray = [];
            m.responses.forEach(async (obj) => {
              const ref = obj._ref;
              try {
                const res = await fetchSingleMessage(ref);
                const thisReply = res[0];
                replyArray = [...replyArray, thisReply];
                replyArray = replyArray.sort(sortByCreatedAt);
                m.responses = replyArray;
                setMessages(newThreads);
                console.log(newThreads);
              } catch (error) {
                console.log(error);
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewThreads();
  }, []);

  return (
    <View style={styles.pageStyles}>
      <Text style={styles.headerStyles}>Disscussion Board</Text>
      <View style={{ width: '100%' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => message._id}
          listKey={createRandomString(22)}
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

            const renderReactions = (
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
                  <ReactionRow
                    id={item._id}
                    likedBy={item.likedBy}
                    lovedBy={item.lovedBy}
                    criedBy={item.criedBy}
                    laughedBy={item.laughedBy}
                  />

                  <Card.Divider />
                  <TouchableOpacity
                    onPress={() => toggleExpand()}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View onPress={(e) => e.stopPropagation()}>
                      {renderReactions}
                    </View>
                    <Icon
                      name={expanded ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome-5"
                    />
                  </TouchableOpacity>
                  <View style={{ display: expanded ? 'flex' : 'none' }}>
                    <FlatList //gets a list of reponse refs
                      showsVerticalScrollIndicator={false}
                      data={item.responses}
                      keyExtractor={(r) => (r ? r._id : createRandomString(11))}
                      listKey={createRandomString(20)}
                      renderItem={({ item }) => {
                        //for each ref,
                        const date = new Date(item._createdAt);
                        const originalPostDate = createParsedDate(date);
                        const avatarUrl = urlFor(item.avatar);
                        return (
                          <View style={styles.responseStyles}>
                            <Avatar
                              rounded
                              size="small"
                              source={{
                                uri: `${avatarUrl}`,
                              }}
                            />
                            <Tooltip
                              width={250}
                              popover={<Text>{originalPostDate}</Text>}
                            >
                              <View style={styles.quoteBoxStyles}>
                                <Text>{item.authorName} said:</Text>
                                <FlatList
                                  data={item.message}
                                  keyExtractor={(p) => p._key}
                                  listKey={createRandomString(14)}
                                  renderItem={({ item }) => {
                                    return (
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.quoteTextStyles}>
                                          {item.children[0].text}
                                        </Text>
                                      </View>
                                    );
                                  }}
                                ></FlatList>
                              </View>
                            </Tooltip>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
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
    paddingBottom: 60,
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
  responseStyles: {
    flexDirection: 'row',
  },
  dateTooltipStyles: {
    width: '65vw',
  },
  quoteBoxStyles: {
    maxWidth: '95%',
    marginTop: 12,
    marginBottom: 2,
    marginLeft: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 18,
    borderTopLeftRadius: 0,
    borderColor: colors.overlayDark,
    backgroundColor: colors.overlayMedium,
  },
  quoteTextStyles: {
    fontStyle: 'italic',
  },
});
