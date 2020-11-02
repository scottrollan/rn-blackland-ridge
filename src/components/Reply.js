import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Reply({ replies }) {
  // useEffect(() => {
  //   console.log('Reply.js 6: ', replies);
  // });

  return (
    <View style={styles.repyStyles}>
      <Text>Gimme some love</Text>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={responses}
        keyExtractor={(r) => r._id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>from {item.authorName}</Text>
              <FlatList
                data={item.message}
                keyExtractor={(p) => p._key}
                renderItem={({ item }) => {
                  return <Text>{item.children[0].text}</Text>;
                }}
              ></FlatList>
            </View>
          );
        }}
      ></FlatList> */}
    </View>
  );
}

const styles = StyleSheet.create({
  replyStyles: {
    width: '100%',
  },
});
