import { Modal, Text } from "react-native"
import PropTypes from 'prop-types'

export default function DetailsModal({
    modalObject,
    setModalObject
}) {

    return (
        <Modal
                animationType="slide"
                transparent={false}
                visible={Object.keys(modalObject).length != 0}
                onRequestClose={() => setModalObject({})}
              >
                  <Text>{modalObject.title}</Text>
                  <Text>{modalObject.location}</Text>
                  <Text>{modalObject.time_added}</Text>
                  <Text>{modalObject.time_expires}</Text>
                  <Text>{modalObject.message}</Text>
                  <Text>{modalObject.provider}</Text>
                  <Text>{modalObject.vegetarian}</Text>
                  <Text>{modalObject.vegan}</Text>
                  <Text>{modalObject.pescatarian}</Text>
                  <Text>{modalObject.gluten_free}</Text>
                  <Text>{modalObject.number_meals}</Text>
                  <Text>{modalObject.meals_claimed}</Text>
                  <Text>{modalObject.added_by_user}</Text>
                  <Text>{modalObject.continuous}</Text>
              </Modal>
    )
}

DetailsModal.propTypes = {
    modalObject: PropTypes.object.isRequired,
    setModalObject: PropTypes.func.isRequired
}