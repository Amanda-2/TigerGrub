import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { get_items } from "./api_access";
import stylesheet from "./styles";

export default function claim_meal_button(
    food_object,
    setItems
) {
    const claim_meal =  async () => 
    {
        try {
            const res = await fetch("http://10.5.0.2:5000/api/claim_meal", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: food_object["id"] })
            });

            const data = await res.json();
            await get_items(setItems)

            if(res.ok) {
                alert("Meal claimed!")
            } else {
                alert("Sorry! Something went wrong. Please try again. Error: " + data.message)
            }
        } catch (error) {
            alert("Something has went wrong. Please try again. If error continues, please contact administrator. " + error)
        }
    }

    if (food_object["continuous"] != 1) {
        return (
            <Pressable
            style={stylesheet.buttons}
                
            onPress={() => claim_meal()}>
            <Text 
            style={{
                color:"white",
                textAlign:"center"
            }}>Claim my meal!</Text>
            </Pressable>
        )
    } else {
        return
    }

    
}