import { Button, Text, View, Pressable } from "react-native";
import React, { useEffect, useState} from "react";
import { TextInput, GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import food_button from "./food_button";
import { get_items } from "./api_access";
import DetailsModal from "./details_modal";
import { filter_results } from "./api_access";
import FilterModal from "./filter_modal";
import stylesheet from "./styles"
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes
} from "@react-native-google-signin/google-signin"
import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Index() {
  const [userInfo, setUserInfo] = useState({})

  GoogleSignin.configure({
    webClientId: "774238777295-9c03v58qmr8t5v3v2dmj3c44j976lht6.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);
  
    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => console.log(user))
      .catch((error) => {
        console.log(error);
      })
  }

  const width = Dimensions.get('window').width;
  // const length = Dimensions.get('window').length;
  const [items, setItems] = useState<React.JSX.Element[]>([]);
  const [modalObject, setModalObject] = useState({})
  const [filters, setFilters] = useState({
    "id":null,
    "title":"",
    "location":"",
    "message":"",
    "provider":"",
    "vegetarian":false,
    "vegan":false,
    "pescatarian":false,
    "gluten_free":false,
    "continuous":false,
  })
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    get_items(setItems);
  }, [])
  

  return (
    <GestureHandlerRootView>
   <View
      style={{
        flexDirection:"column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE0CE"
      }}
    >
      <TextInput
        style={{
          height:40,
          width: width * .9,
          margin: 12,
          borderWidth: 1,
          backgroundColor: "white",
          color:"black",
          borderRadius: 15,
          fontFamily: "Arial"
        }}
        placeholder="Search for a food..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text)
        }}></TextInput>

    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />

      <Text
      style={{
        fontFamily:"Courier New",
        fontSize:25,
      }}>AVAILABLE NOW</Text>

      <Pressable
      style={stylesheet.buttons}
      onPress={() => setFilterModalVisible(!filterModalVisible)}
      >
        <Text style={stylesheet.smallText}>Filter Results</Text>
      </Pressable>

      <FilterModal filters={filters} setFilters={setFilters} filterModalVisible={filterModalVisible} setFilterModalVisible={setFilterModalVisible}></FilterModal>
      
      <DetailsModal modalObject={modalObject} setModalObject={setModalObject} setItems={setItems}/>

      <FlatList
      data={filter_results(items, filters, searchQuery)}
      renderItem={({item}) => food_button(item, setItems, setModalObject)}
      keyExtractor={item => item.id}

      style={{
        flex:1,
        padding: 10,
      }}/>
    </View>
    </GestureHandlerRootView>
  );
}
