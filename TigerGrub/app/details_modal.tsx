import { View, Modal, Text, StyleSheet, Image, Pressable } from "react-native"
import PropTypes from 'prop-types'
import claim_meal_button from './claim_meal_button'
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import { delete_entry } from "./api_access";
import stylesheet from "./styles"

export default function DetailsModal({
    modalObject,
    setModalObject,
    setItems,
    user
}) {

    const format = (number_meals, meals_claimed) => {
        if (number_meals != null) {
            return (
            <View style={{
                flexDirection:"row",
            }}>
                <View
                style={{
                    flexDirection:"column",
                    paddingRight: 10,
                }}>
                    <Text style={stylesheet.smallText}>{meals_claimed}</Text>
                    <View style={{height:1, width:'100%', backgroundColor:"white"}} />
                    <Text style={stylesheet.smallText}>{number_meals}</Text>
                </View>
                <View style={{flexDirection:"column"}}>
                    <Text style={stylesheet.smallText}>Meals</Text>
                    <Text style={stylesheet.smallText}>Claimed</Text>
                </View>
                
            </View>
            )
        }
        else if (modalObject["continuous"] != 1) {
            return (
            <View
                style={{
                flexDirection:"row"
            }}>
                <Text style={[stylesheet.smallText, {fontSize: 15}]}>{meals_claimed}</Text>
                <Text style={[stylesheet.smallText]}>Meals Claimed</Text>
            </View>
        )}
        else return
    }

    const get_time_difference = (time) => {
            const now = moment();
            const time_added = moment(time);
    
            if (!time_added.isValid()) {
                if (modalObject["continuous"] == 1) {
                    return "Repeated Event. Click for details."
                } else {
                    return "!ERROR! Please contact administrator."
                }
            }
    
            return "Added " + time_added.fromNow();
        }

    const renderPhotos = () => {
        if(modalObject["photo_links"] != null) {
            const links = modalObject["photo_links"].split(";").filter(link => link.trim() !== "");
            const image_code = []
            return links.map((link, index) => (
                <Image key={index} source={{uri: link}} style={{width:"100%", height:500}} resizeMode="contain"/>
            ))
        }
        return null;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={Object.keys(modalObject).length != 0}
            onRequestClose={() => setModalObject({})}
        >
            <View style={stylesheet.modalBackground}>
            <ScrollView>
            <View
                style={{
                    backgroundColor:"#90B874",
                    padding:20,
                }}
            >
                <Text style={[stylesheet.titleText, {textAlign:"center", alignSelf:"center"}]}>{modalObject.title}</Text>
                <Text style={[stylesheet.titleText, {textAlign:"center"}]}>{format(modalObject["number_meals"], modalObject["meals_claimed"])}</Text>
                <Text style={stylesheet.smallText}>{get_time_difference(modalObject["time_added"])}</Text>
                <Text style={stylesheet.smallText}>Located at {modalObject.location}</Text>
                <Text style={stylesheet.smallText}>Courtesy of {modalObject.provider}</Text>
                <Text style={stylesheet.smallText}>Vegetarian: {String(modalObject.vegetarian)}</Text>
                <Text style={stylesheet.smallText}>Vegan: {String(modalObject.vegan)}</Text>
                <Text style={stylesheet.smallText}>Pescatarian: {String(modalObject.pescatarian)}</Text>
                <Text style={stylesheet.smallText}>Gluten Free: {String(modalObject.gluten_free)}</Text>
                <Text style={stylesheet.smallText}>{modalObject.continuous ? "Repeated Event" : ""}</Text>
                <Text style={stylesheet.smallText}>{modalObject.message}</Text>
                
                <View
                style={{
                    flexDirection:"row",
                    flexWrap:"wrap"
                }}>
                    {renderPhotos()}
                </View>
                {claim_meal_button(modalObject, setItems)}
                {user && user === modalObject["added_by_user"] && (
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                
                    <Pressable
                      onPress={() => {
                        delete_entry(modalObject["id"], setItems)
                        setModalObject({})
                      }}
                      style={[stylesheet.buttons, {backgroundColor: "#D32F2F"}]}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>Delete</Text>
                    </Pressable>
                  </View>
                
                )}
            </View></ScrollView></View>
            
        </Modal>
    )
}

DetailsModal.propTypes = {
    modalObject: PropTypes.object.isRequired,
    setModalObject: PropTypes.func.isRequired
}