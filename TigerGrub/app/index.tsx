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

export default function Index() {
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
