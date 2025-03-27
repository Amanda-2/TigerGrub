import database
import datetime
import os

def test_get_by_id():
    id = 123456
    correct_result = [(123456, 'Tex-Mex at Frist', 'Frist 10002', datetime.datetime(2025, 1, 6, 18, 12, 51), datetime.datetime(2025, 3, 8, 18, 12, 51), 'Lorem Ipusm dolor hguiroaph huo hbu qA  H8GVN 7AFG  h52354 <>>?:":{', 'Student Government Association', 0, 0, 0, 0, 20, 10, 'amandasparks02@gmail.com', 0, None)]
    results = database.get_by_id(id)
    assert results == correct_result

    id = 000000
    correct_result = []
    results = database.get_by_id(id)
    assert results == correct_result

def test_can_edit():
    # Admin emails can change entries they added
    id = 123456
    can_edit = database.can_edit(id, os.environ["ADMIN_EMAIL"])
    assert can_edit == True

    # Admin emails can change entries they did not add
    id = 185812
    can_edit = database.can_edit(id, os.environ["ADMIN_EMAIL"])
    assert can_edit == True

    # Non-admins can change entires they added
    id = 896376
    can_edit = database.can_edit(id, "asparks@princeton.edu")
    assert can_edit == True

    # Non-admins can't change entires they did not add
    id = 185812
    can_edit = database.can_edit(id, "asparks@princeton.edu")
    assert can_edit == False

def test_add_delete():
    # Tests non-continous entry addition
    title = "add_test"
    location = "location test"
    time_added = datetime.datetime.now().replace(microsecond=0)
    time_expires = 0
    message = "This is a test entry for the database tests"
    provider = "Strawhat Luffy"
    vegetarian = False
    vegan = False
    pescatarian = False
    gluten_free = False
    number_meals = 45
    meals_claimed = 0
    added_by_user = "admin@test.gmail"
    continuous = False

    (result, id) = database.add(title, location, time_added, time_expires, message, provider, vegetarian, vegan, pescatarian, gluten_free, number_meals, meals_claimed, added_by_user, continuous)
    assert result == "success"
    time_expires = time_added + datetime.timedelta(minutes=time_expires)
    search_results = database.get_by_id(id)
    assert search_results == [(id, title, location, time_added, time_expires, message, provider, 0, 0, 0, 0, number_meals, meals_claimed, added_by_user, continuous, None)]

    database.delete(id)
    search_results = database.get_by_id(id)
    assert search_results == []

    # Tests continous entry addition
    time_added = None
    time_expires = None
    number_meals = None
    continuous = True

    (result, id) = database.add(title, location, time_added, time_expires, message, provider, vegetarian, vegan, pescatarian, gluten_free, number_meals, meals_claimed, added_by_user, continuous)
    assert result == "success"

    search_results = database.get_by_id(id)
    assert search_results == [(id, title, location, time_added, time_expires, message, provider, vegetarian, vegan, pescatarian, gluten_free, number_meals, meals_claimed, added_by_user, continuous, None)]

    database.delete(id)
    search_results = database.get_by_id(id)
    assert search_results == []

if __name__ == "__main__":
    test_get_by_id()
    test_can_edit()
    test_add_delete()