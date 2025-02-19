import { Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function Index() {
  const [items, setItems] = useState(["FAILURE"]);

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        console.log(JSON.stringify(data))
  });
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{items}</Text>
    </View>
  );
}
