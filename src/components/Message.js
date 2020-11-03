import React from 'react';
import ProfilePic from './ProfilePic';
import { createRandomString } from '../functions/CreateRandomString';
import { createParsedDate } from '../functions/CreateParsedDate';
import { builderImageUrl } from '../api/sanityClient';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  TouchableOpacity,
  Avatar,
  Tooltip,
  Overlay,
} from 'react-native-elements';
import colors from '../styles';

const urlFor = (source) => {
  return builderImageUrl.image(source);
};

export default function Reply({ data }) {
  return (
    <FlatList //gets a list of reponse refs
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(r) => (r ? r._id : createRandomString(11))}
      listKey={createRandomString(20)}
      renderItem={({ item }) => {
        //for each ref,
        const date = new Date(item._createdAt);
        const originalPostDate = createParsedDate(date);
        const imageURL = urlFor(item.avatar);
        return (
          <View style={styles.responseStyles}>
            <ProfilePic imageURL={imageURL} />

            <Tooltip width={250} popover={<Text>{originalPostDate}</Text>}>
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
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 0,
    borderRadius: 18,
    borderTopLeftRadius: 0,
    borderColor: colors.overlayDark,
    backgroundColor: colors.accent,
  },
  quoteTextStyles: {
    fontStyle: 'italic',
  },
});
