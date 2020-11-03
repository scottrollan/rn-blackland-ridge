import React from 'react';
import ProfilePic from './ProfilePic';
import ImageDisplay from './ImageDisplay';
import { createRandomString } from '../functions/CreateRandomString';
import { createParsedDate } from '../functions/CreateParsedDate';
import { builderImageUrl } from '../api/sanityClient';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Tooltip } from 'react-native-elements';
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
        const profilePicURL = urlFor(item.avatar);
        let imageURL = urlFor(item.image);

        return (
          <View style={styles.responseStyles}>
            <ProfilePic profileURL={profilePicURL} />

            <Tooltip width={250} popover={<Text>{originalPostDate}</Text>}>
              <View style={styles.quoteBoxStyles}>
                <Text>{item.authorName} said:</Text>
                <FlatList
                  data={item.message}
                  keyExtractor={(p) => p._key}
                  listKey={createRandomString(14)}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Text style={styles.quoteTextStyles}>
                          {item.children[0].text}
                        </Text>
                        <ImageDisplay
                          imageURL={imageURL}
                          height={150}
                          width={150}
                        />
                        {/* <View
                          style={{
                            display: imageURL.options.source ? 'flex' : 'none',
                          }} */}
                        {/* > */}
                        {/* <TouchableOpacity onPress={() => toggleOverlay()}>
                            <Image
                              source={{ uri: `${imageURL}` }}
                              style={{
                                minWidth: 100,
                                minHeight: 100,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Overlay
                          isVisible={visible}
                          onBackdropPress={toggleOverlay}
                          // style={styles.overlayStyles}
                        >
                          <Image
                            source={{ uri: `${imageURL}` }}
                            style={{ minWidth: '90%', minHeight: '75%' }}
                            resizeMethod="scale"
                            resizeMode="contain"
                          />
                        </Overlay> */}
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
