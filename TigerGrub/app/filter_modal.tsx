import { View, Modal, Text, StyleSheet, Image, Pressable } from "react-native"
import PropTypes from 'prop-types'
import stylesheet from "./styles";
import { ScrollView, Switch } from "react-native-gesture-handler";

export default function FilterModal({
    filters,
    setFilters,
    filterModalVisible,
    setFilterModalVisible
}) {

    const handle_change = (key) => {
        setFilters(previous => ({...previous, [key]: !previous[key]}));
    }

    const format_filters = () => {
        return ([
            {label: "Vegetarian", key:"vegetarian"},
            {label: "Vegan", key:"vegan"},
            {label: "Pescatarian", key:"pescatarian"},
            {label: "Gluten Free", key:"gluten_free"},
            {label: "Repeated Events Only", key:"continuous"}
        ].map(({label, key}) => (
            <View key={key} style={stylesheet.row}>
                <Text style={stylesheet.smallText}>{label}</Text>
                <Switch value={filters[key]}
                onValueChange={() => handle_change(key)}></Switch>
            </View>
        )))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <View style={stylesheet.modalBackground}>
            <ScrollView
            style={{
                backgroundColor:"#90B874",
                padding:20,
            }}>
                <Text style={stylesheet.titleText}>Filters</Text>
                {format_filters()}

            <Pressable
                style={{
                    borderRadius:5,
                    backgroundColor:"#33691E",
                    width:"auto",
                    height:"auto",
                    padding:10
                }}
                
                onPress={() => setFilterModalVisible(false)}>
                    <Text style={{
                        color:"white",
                        textAlign:"center"
                    }}>Apply Filters</Text>
            </Pressable>
            </ScrollView>
            </View>
        </Modal>
    )
}

FilterModal.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    filterModalVisible: PropTypes.bool.isRequired,
    setFilterModalVisible: PropTypes.func.isRequired
}