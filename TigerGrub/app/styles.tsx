import { StyleSheet} from "react-native"

const stylesheet = StyleSheet.create({
    buttons: {
        borderRadius:5,
        backgroundColor:"#33691E",
        width:"auto",
        height:"auto",
        padding:10
    },
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
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
})

export default stylesheet