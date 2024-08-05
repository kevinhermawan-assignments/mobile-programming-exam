import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { images } from '../data/images';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

function Home({ navigation }: NativeStackScreenProps<any, 'Home'>) {
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setFetching(true);

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data: User[] = await response.json();

    const dataWithImage = data.map((user, index) => ({
      ...user,
      image: images[index],
    }));

    setUsers(dataWithImage);
    setFetching(false);
  }

  return (
    <FlatList
      data={users}
      refreshing={fetching}
      onRefresh={fetchUsers}
      renderItem={({ item }) => (
        <Card
          mode="outlined"
          style={styles.card}
          onPress={() => navigation.navigate('Detail', { user: item })}>
          <View style={styles.cardContent}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardRightContent}>
              <View>
                <Text variant="labelSmall">User ID: {item.id}</Text>
                <Text variant="titleMedium" numberOfLines={1}>
                  {item.name} (@{item.username})
                </Text>
                <Text>{item.email}</Text>
              </View>
              <View>
                <Text style={styles.address}>
                  {item.address.street}, {item.address.suite}{' '}
                  {item.address.zipcode}, {item.address.city}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderColor: '#2196F3',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardRightContent: {
    flex: 1,
    margin: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: 128,
    height: 128,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  address: {
    color: '#2196F3',
  },
});

export default Home;
