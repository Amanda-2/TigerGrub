const url = 'https://app-4f25e1bc-767a-40be-85d3-1d5251a66fed.cleverapps.io'
// const url = "http://10.0.0.63:5000"

export const get_items = ((setItems) => {
    fetch(url + "/api/get_options")
    .then(response => response.json())
    .then(data => {
      setItems(data)
});
})

export function filter_results (items, filters, searchQuery) {
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

export const add_food = async(
  title,
  location,
  time_added,
  time_expires,
  message,
  provider,
  vegetarian,
  vegan,
  pescatarian,
  gluten_free,
  number_meals,
  meals_claimed,
  user,
  continuous,
  setItems
) => {
  try {
    const res = await fetch(url + "/api/add_food", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title:title,
          location:location,
          time_added:time_added,
          time_expires:time_expires,
          message:message,
          provider:provider,
          vegetarian:vegetarian,
          vegan:vegan,
          pescatarian:pescatarian,
          gluten_free:gluten_free,
          number_meals:number_meals,
          meals_claimed:meals_claimed,
          user:user,
          continuous:continuous
        })
    });

    const data = await res.json();
    await get_items(setItems)

    if(res.ok) {
        alert("Entry added! Thank you for your participation!")
    } else {
        alert("Sorry! Something went wrong. Please try again. Error: " + data.message)
    }
} catch (error) {
    alert("Something has went wrong. Please try again. If error continues, please contact administrator. " + error)
}
}

export const delete_entry = async(id, setItems) => {
  try {
    const res = await fetch(url + "/api/delete_entry", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id
      })
    });

    const data = await res.json();
    console.log(data)
    await get_items(setItems)
      if(res.ok) {
        alert("Entry deleted.")
    } else {
        alert("Sorry! Something went wrong. Please try again. Error: " + data.message)
    }
  } catch (error) {
    alert("Something has went wrong. Please try again. If error continues, please contact administrator. " + error)
  }
}