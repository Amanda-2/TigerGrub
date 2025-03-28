export const get_items = ((setItems) => {
    fetch('http://10.5.0.2:5000/api/get_options')
    .then(response => response.json())
    .then(data => {
      setItems(data)
});
})