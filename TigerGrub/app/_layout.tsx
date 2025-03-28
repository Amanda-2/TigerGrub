import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [fontsLoaded] = useFonts({
  //   IrishGrover: require('../node_modules/@expo-google-fonts/irish-grover'),
  // });

  const fontsLoaded = true

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
