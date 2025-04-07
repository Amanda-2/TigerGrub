import { View, Modal, Text, StyleSheet, Image } from "react-native"
import PropTypes from 'prop-types'
import claim_meal_button from './claim_meal_button'
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

export default function DetailsModal({
    modalObject,
    setModalObject,
    setItems
}) {

    const styles = StyleSheet.create({
        titleText: {
            fontSize: 20,
            textAlign: "left",
            paddingLeft: 5,
            paddingTop: 5,
            color:"white",
        },
        smallText: {
            fontSize:15,
            textAlign: "left",
            paddingLeft: 5,
            color: "white"
        }
    })

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
                    <Text style={styles.smallText}>{meals_claimed}</Text>
                    <View style={{height:1, width:'100%', backgroundColor:"white"}} />
                    <Text style={styles.smallText}>{number_meals}</Text>
                </View>
                <View style={{flexDirection:"column"}}>
                    <Text style={styles.smallText}>Meals</Text>
                    <Text style={styles.smallText}>Claimed</Text>
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
                <Text style={[styles.smallText, {fontSize: 15}]}>{meals_claimed}</Text>
                <Text style={[styles.smallText]}>Meals Claimed</Text>
            </View>
        )}
        else return
    }

    const get_time_difference = (time) => {
            console.log(time)
            const now = moment();
            const time_added = moment(time);
    
            if (!time_added.isValid()) {
                if (modalObject["continuous"] == 1) {
                    return "Repeated Event. Click for details."
                } else {
                    console.log(time_added)
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
            <ScrollView>
            <View
                style={{
                    backgroundColor:"#90B874",
                    padding:20,
                }}
            >
                <Text style={[styles.titleText, {textAlign:"center", alignSelf:"center"}]}>{modalObject.title}</Text>
                <Text style={[styles.titleText, {textAlign:"center"}]}>{format(modalObject["number_meals"], modalObject["meals_claimed"])}</Text>
                <Text style={styles.smallText}>{get_time_difference(modalObject["time_added"])}</Text>
                <Text style={styles.smallText}>Located at {modalObject.location}</Text>
                <Text style={styles.smallText}>Courtesy of {modalObject.provider}</Text>
                <Text style={styles.smallText}>Vegetarian: {String(modalObject.vegetarian)}</Text>
                <Text style={styles.smallText}>Vegan: {String(modalObject.vegan)}</Text>
                <Text style={styles.smallText}>Pescatarian: {String(modalObject.pescatarian)}</Text>
                <Text style={styles.smallText}>Gluten Free: {String(modalObject.gluten_free)}</Text>
                <Text style={styles.smallText}>{modalObject.continuous ? "Repeated Event" : ""}</Text>
                <Text style={styles.smallText}>{modalObject.message}</Text>
                
                <View
                style={{
                    flexDirection:"row",
                    flexWrap:"wrap"
                }}>
                    {renderPhotos()}
                </View>
                {claim_meal_button(modalObject, setItems)}
            </View></ScrollView>
            
        </Modal>
    )
}

DetailsModal.propTypes = {
    modalObject: PropTypes.object.isRequired,
    setModalObject: PropTypes.func.isRequired
}