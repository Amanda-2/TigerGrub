import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import moment from "moment";
import claim_meal_button from "./claim_meal_button";

export default function food_button(
    food_object,
    setItems,
    setModalObject
) {
    const max_message_length = 52
    const styles = StyleSheet.create({
        titleText: {
            fontSize: 20,
            textAlign: "left",
            paddingLeft: 5,
            paddingTop: 5,
            color:"white",
        },
        smallText: {
            fontSize:10,
            textAlign: "left",
            paddingLeft: 5,
            color: "white"
        }
    })

    const get_time_difference = (time) => {
        console.log(time)
        const now = moment();
        const time_added = moment(time);

        if (!time_added.isValid()) {
            if (food_object["continuous"] == 1) {
                return "Repeated Event. Click for details."
            } else {
                console.log(time_added)
                return "!ERROR! Please contact administrator."
            }
        }

        return "Added " + time_added.fromNow();
    }

    const truncate_text = (text) => {
        return text.length > max_message_length ? text.substring(0, max_message_length) + "..." : text
    }

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
                    <Text>{meals_claimed}</Text>
                    <View style={{height:1, width:'100%', backgroundColor:"black"}} />
                    <Text>{number_meals}</Text>
                </View>
                <View style={{flexDirection:"column"}}>
                    <Text>Meals</Text>
                    <Text>Claimed</Text>
                </View>
                
            </View>
            )
        }
        else if (food_object["continuous"] != 1) {
            return (
            <View>
                <Text>{meals_claimed} Meals Claimed</Text>
            </View>
        )}
        else return
    }

    return (
    <Pressable
    style={{
        backgroundColor:"#D23600",
        borderRadius: 15,
        marginVertical: 5,
        paddingBottom: 25,
        width:380,
        alignSelf:"flex-start",
        height: 150,
        flexDirection: "column"
    }}
    
    onPress={() => setModalObject(food_object)}
    >
        <Text style={styles.titleText}>{food_object["title"]}</Text>
        <View style={{
            flexDirection: "row"
        }}>
        <View
        style={{
            flex:1
        }}>
            <Text style={styles.smallText}>{get_time_difference(food_object["time_added"])}</Text>
            <Text style={styles.smallText}>Located at {food_object["location"]}</Text>
            <Text style={styles.smallText}>Courtesy of {food_object["provider"]}</Text>
            <Text style={styles.smallText}>{truncate_text(food_object["message"])}</Text>
        </View>
        <View
        style={{
            flex:1,
            alignItems:"flex-end",
            flexDirection:"column"
        }}>
            {format(food_object["number_meals"], food_object["meals_claimed"])}
            {claim_meal_button(food_object, setItems)}
            {/* {format(food_object["number_meals"], food_object["meals_claimed"])} */}
        </View>
        </View>
    </Pressable>
    )
}