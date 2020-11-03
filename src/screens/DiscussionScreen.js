import React, { useState, useEffect } from 'react';
import ProfilePic from '../components/ProfilePic';
import ReactionRow from '../components/ReactionRow';
import RecordedReactions from '../components/RecordedReactions';
import Message from '../components/Message';
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
import { Card, Icon } from 'react-native-elements';

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
                      <RecordedReactions item={item} />
                    </View>
                    <Icon
                      name={expanded ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome-5"
                    />
                  </TouchableOpacity>
                  <View style={{ display: expanded ? 'flex' : 'none' }}>
                    <Message data={item.responses} />
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
});
