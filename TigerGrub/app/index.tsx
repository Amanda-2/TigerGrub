import { Button, Text, View, Modal } from "react-native";
import React, { useEffect, useState} from "react";
import { TextInput, GestureHandlerRootView, FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import food_button from "./food_button";
import { get_items } from "./api_access";
import DetailsModal from "./details_modal";

export default function Index() {
  const width = Dimensions.get('window').width;
  // const length = Dimensions.get('window').length;
  const [items, setItems] = useState<React.JSX.Element[]>([]);
  const [modalObject, setModalObject] = useState({})

  get_items(setItems)

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
        placeholder="Search for a food..."></TextInput>
      <Text
      style={{
        fontFamily:"Courier New",
        fontSize:25,
      }}>AVAILABLE NOW</Text>
      <DetailsModal modalObject={modalObject} setModalObject={setModalObject}/>
      {/* <Button title="update items" onPress={() => get_items(setItems)}></Button> */}
      <FlatList
      data={items}
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
