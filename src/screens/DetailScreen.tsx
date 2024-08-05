import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

function Detail({ route, navigation }: NativeStackScreenProps<any, 'Detail'>) {
  const user = route.params?.user;

  useEffect(() => {
    navigation.setOptions({
      title: `${user?.name}'s Address`,
    });
  }, [navigation, user?.name]);

  return (
    <WebView
      source={{
        uri: `https://maps.google.com/maps?q=${user?.address.geo.lat},${user?.address.geo.lng}`,
      }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Detail;
