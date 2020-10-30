import React from 'react';
import { WebView } from 'react-native-webview';

export default function ZillowScreen() {
  return (
    <WebView
      source={{
        uri:
          'https://www.zillow.com/homes/for_sale/?searchQueryState=%7B%22usersSearchTerm%22%3A%2230067%22%2C%22mapBounds%22%3A%7B%22west%22%3A-84.43712215325927%2C%22east%22%3A-84.42454795739745%2C%22south%22%3A33.94546877093187%2C%22north%22%3A33.95742995262041%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A16%2C%22customRegionId%22%3A%2275aa25f873X1-CReejk073xunpa_wtbvq%22%7D',
      }}
    />
  );
}
