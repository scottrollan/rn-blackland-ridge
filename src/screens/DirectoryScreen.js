import React, { useState, useEffect } from 'react';
import {
  fetchDirectory,
  builderImageUrl,
  patchReactionArray,
} from '../api/sanityClient';
import ProfilePic from '../components/ProfilePic';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const urlFor = (source) => {
  return builderImageUrl.image(source);
};

export default function DirectoryScreen() {
  const [neighbors, setNeighbors] = useState([]);
  const [onAddressMode, setOnAddressMode] = useState(false);

  const sortByAddress = () => {
    let neighborList = [...neighbors];
    neighborList.sort((a, b) =>
      a.address.split(' ')[1] + a.address.split(' ').shift() >
      b.address.split(' ')[1] + b.address.split(' ').shift()
        ? 1
        : -1
    );
    setNeighbors([...neighborList]);
    setOnAddressMode(true);
  };

  const sortByName = () => {
    let neighborList = [...neighbors];
    neighborList.sort((a, b) =>
      a.name.split(' ').pop() + a.name.split(' ')[0] > //DoeJane will come before DoeJohn
      b.name.split(' ').pop() + b.name.split(' ')[0]
        ? 1
        : -1
    );
    setNeighbors([...neighborList]);
    setOnAddressMode(false);
  };

  useEffect(() => {
    const fetchNeighbors = async () => {
      let neighborList = await fetchDirectory();
      if (neighborList) {
        neighborList.sort((a, b) =>
          a.name.split(' ').pop() + a.name.split(' ')[0] > //DoeJane will come before DoeJohn
          b.name.split(' ').pop() + b.name.split(' ')[0]
            ? 1
            : -1
        );
        setNeighbors([...neighborList]);
      }
    };
    fetchNeighbors();
  }, []);
  return (
    <View>
      <View style={{ display: onAddressMode ? 'none' : 'flex' }}>
        <Button title="Sort By Address" onPress={() => sortByAddress()} />
      </View>
      <View style={{ display: onAddressMode ? 'flex' : 'none' }}>
        <Button title="Sort By Name" onPress={() => sortByName()} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(neighbor) => neighbor.name}
        data={neighbors}
        renderItem={({ item }) => {
          const imageURL = urlFor(item.image);
          return (
            <Card>
              <Card.Title
                style={{
                  fontSize: 25,
                  display: onAddressMode ? 'none' : 'flex',
                }}
              >
                {item.name}
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: 18,
                  display: onAddressMode ? 'flex' : 'none',
                }}
              >
                {item.address}
              </Card.Title>
              <Card.Divider />
              <View style={styles.cardBodyStyles}>
                <View>
                  <Text style={{ display: onAddressMode ? 'flex' : 'none' }}>
                    {item.name}
                  </Text>
                  <Text style={{ display: onAddressMode ? 'none' : 'flex' }}>
                    {item.address}
                  </Text>
                  <Text
                    style={{
                      display: item.phoneInDirectory ? 'flex' : 'none',
                    }}
                  >
                    {item.phone}
                  </Text>
                  <Text
                    style={{
                      display: item.emailInDirectory ? 'flex' : 'none',
                    }}
                  >
                    {item.email}
                  </Text>
                </View>
                <ProfilePic
                  profileURL={imageURL}
                  // imageSource={require(item.image)}
                />
              </View>
            </Card>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 20,
    padding: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 5,
  },
  cardBodyStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 30,
    color: 'purple',
  },
});
