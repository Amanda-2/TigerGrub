export const get_items = ((setItems) => {
    fetch('http://10.5.0.2:5000/api/get_options')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setItems(data)
});
})

export function filter_results (items, filters, searchQuery) {
  console.log("items:")
  console.log(items)
  console.log("filters:")
  console.log(filters)
  console.log("searchQuery:")
  console.log(searchQuery)
  return items.filter(item => {
    if (filters.vegetarian && !item.vegetarian) return null;
    if (filters.vegan && !item.vegan) return null;
    if (filters.pescatarian && !item.pescatarian) return null;
    if (filters.gluten_free && !item.gluten_free) return null;
    if (filters.continuous && !item.continuous) return null;

    const query = searchQuery.toLowerCase();
    const inTitle = item.title.toLowerCase().includes(query);
    const inMessage = item.message.toLowerCase().includes(query);

    return inTitle || inMessage;
  })
}