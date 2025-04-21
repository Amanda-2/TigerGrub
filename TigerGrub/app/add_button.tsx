import { 
    Pressable,
    Text,
    Modal,
    View,
    TextInput,
    ScrollView,
    Switch,
} from "react-native";
// import {Menu, Button, Provider} from 'react-native-paper'
import DropDownPicker from "react-native-dropdown-picker"
import React, { useEffect, useState} from "react";
import { add_food } from "./api_access";
import stylesheet from "./styles";

type AddButtonProps = {
    user: string;
    addModalOpen: boolean;
    setAddModalOpen: (open: boolean) => void;
    setItems;
};

export default function AddButton({
    user,
    addModalOpen,
    setAddModalOpen,
    setItems
}: AddButtonProps) {
    const [expireHourOpen, setExpireHourOpen] = useState(false);
    const [hourItems, setHourItems] = useState(
        Array.from({ length: 24 }, (_, i) => ({
          label: `${i} hour${i !== 1 ? 's' : ''}`,
          value: i.toString(),
        }))
      );
    
    const [expireMinuteOpen, setExpireMinuteOpen] = useState(false);
    const [minuteItems, setMinuteItems] = useState(
        [0, 15, 30, 45].map(min => ({
          label: `${min} min`,
          value: min.toString(),
        }))
      );

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [provider, setProvider] = useState("");
    const [photoLinks, setPhotoLinks] = useState("");
    const [numberMeals, setNumberMeals] = useState("");
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [pescatarian, setPescatarian] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [continuous, setContinuous] = useState(false);

    const [expireHour, setExpireHour] = useState("1");
    const [expireMinute, setExpireMinute] = useState("0");

    const handleSubmit = async() => {
        const now = new Date();
        let time_added = null;
        let time_expires = null;
        if (!continuous) {
            const now = new Date();
            time_added = now.toISOString();

            const expiration = new Date(now);
            expiration.setHours(now.getHours() + parseInt(expireHour))
            expiration.setMinutes(now.getMinutes() + parseInt(expireMinute));
            time_expires = expiration.toISOString();
        }
        

        await add_food(
            title,
            location,
            time_added,
            time_expires,
            message,
            provider,
            vegetarian,
            vegan,
            pescatarian,
            glutenFree,
            numberMeals,
            0,
            user,
            continuous,
            setItems
        )
    }

    const add_modal = (
        <Modal
        animationType="slide"
        transparent={true}
        visible={addModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
      >
        <View style={stylesheet.modalBackground}>
        <View
          style={{ padding: 20, backgroundColor: "white" }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Text>Email (not editable): {user}</Text>

          <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput placeholder="Location" value={location} onChangeText={setLocation} />
          <TextInput
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TextInput
            placeholder="Provider"
            value={provider}
            onChangeText={setProvider}
          />
          <TextInput
            placeholder="Photo Links"
            value={photoLinks}
            onChangeText={setPhotoLinks}
          />
          <TextInput
            placeholder="Number of Meals"
            value={numberMeals}
            onChangeText={setNumberMeals}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Vegetarian</Text>
            <Switch value={vegetarian} onValueChange={setVegetarian} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Vegan</Text>
            <Switch value={vegan} onValueChange={setVegan} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Pescatarian</Text>
            <Switch value={pescatarian} onValueChange={setPescatarian} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Gluten Free</Text>
            <Switch value={glutenFree} onValueChange={setGlutenFree} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>Repeated Event?</Text>
            <Switch value={continuous} onValueChange={setContinuous} />
          </View>
          {!continuous && (
            <>
                <Text>Time Expires (hours + minutes from now):</Text>

                <View style={{ zIndex: 1000 }}>
                    <DropDownPicker
                    open={expireHourOpen}
                    value={expireHour}
                    items={hourItems}
                    setOpen={setExpireHourOpen}
                    setValue={setExpireHour}
                    setItems={setHourItems}
                    placeholder="Select hours"
                    containerStyle={{ marginBottom: 10 }}
                    />
                </View>

                <View style={{ zIndex: 900 }}>
                    <DropDownPicker
                    open={expireMinuteOpen}
                    value={expireMinute}
                    items={minuteItems}
                    setOpen={setExpireMinuteOpen}
                    setValue={setExpireMinute}
                    setItems={setMinuteItems}
                    placeholder="Select minutes"
                    />
                </View>
            </>
          )}

          <Pressable
            onPress={handleSubmit}
            style={stylesheet.buttons}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
          </Pressable>

          <Pressable
            onPress={() => setAddModalOpen(false)}
            style={{ marginTop: 10, alignItems: "center" }}
          >
            <Text style={{ color: "#33691E" }}>Cancel</Text>
          </Pressable>
        </View>
        </View>
      </Modal>
    )

    return (
        <>
        <Pressable
            style={[stylesheet.buttons,
              {
                backgroundColor: user ? "#33691E" : "#808080",
              }
            ]}
                
            onPress={() => 
                {
                    if (user) {
                        setAddModalOpen(true)
                    } else {
                        alert("Please log in to add an entry.")
                    }
                    
                }}>
            <Text 
                style={{
                    color:"white",
                    textAlign:"center"
                }}>Add an entry</Text>
        </Pressable>

        {add_modal}</>
    )
}