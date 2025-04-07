import { View, Modal, Text, StyleSheet, Image, Pressable } from "react-native"
import PropTypes from 'prop-types'
import claim_meal_button from './claim_meal_button'
import moment from 'moment';
import { ScrollView, Switch } from "react-native-gesture-handler";

export default function FilterModal({
    filters,
    setFilters,
    filterModalVisible,
    setFilterModalVisible
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
        },
        row: {
            flexDirection: "row",
            justifyContent:"space-between",
            alignItems: "center",
            marginVertical: 10
        },
    })
    console.log(filters)

    const handle_change = (key) => {
        console.log(filters)
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
            <View key={key} style={styles.rows}>
                <Text style={styles.smallText}>{label}</Text>
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
            <ScrollView
            style={{
                backgroundColor:"#90B874",
                padding:20,
            }}>
                <Text style={styles.titleText}>Filters</Text>
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

        </Modal>
    )
}

FilterModal.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    filterModalVisible: PropTypes.bool.isRequired,
    setFilterModalVisible: PropTypes.func.isRequired
}