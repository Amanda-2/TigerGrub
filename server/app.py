from flask import Flask, jsonify, request
from flask_cors import CORS
from server import database
# import datetime
# import time
# import threading
# import database

app = Flask(__name__)

CORS(app)

@app.route("/api/delete_entry", methods=['POST'])
def delete_entry():
    data = request.get_json()
    id = data.get("id")
    
    id = data.get("id")

    if id is None:
        return jsonify({"message": "ID is invalid"}), 400
    
    (result, message) = database.delete(id)

    if (result == "success"):
        return jsonify({
            "success": result,
            "id": message}), 200
    else:
        return jsonify({
            "success": result,
            "error": message
        }), 200

@app.route("/api/can_edit", methods=['GET'])
def can_edit():
    data = request.get_json()
    user = data.get("user")
    

@app.route("/api/get_options", methods=['GET'])
def get_available():
    available = database.get_options([])
    print(available)
    return jsonify(available)

@app.route('/api/test', methods=['GET'])
def run_connection_test():
    items = "Test has succeeded"
    return jsonify(items)

@app.route('/api/claim_meal', methods=['POST'])
def claim_meal():
    data = request.get_json()
    id = data.get("id")

    if id is None:
        return jsonify({"message": "ID is invalid"}), 400
    
    (result, message) = database.claim_meal(id)

    if (result == "success"):
        return jsonify({
            "success": result,
            "id": message}), 200
    else:
        return jsonify({
            "success": result,
            "error": message
        }), 200

@app.route('/api/add_food', methods=['POST'])
def add_food():
    database.clean_database()
    data = request.get_json()
    print(data)
    title = data.get("title")
    
    location = data.get("location")
    time_added = data.get("time_added")
    time_expires = data.get("time_expires")
    message = data.get("message")
    provider = data.get("provider")
    vegetarian = data.get("vegetarian")
    vegan = data.get("vegan")
    pescatarian = data.get("pescatarian")
    gluten_free = data.get("gluten_free")
    number_meals = data.get("number_meals")
    meals_claimed = data.get("meals_claimed")
    user = data.get("user")
    continuous = data.get("continuous")
    
    (result, message) = database.add(
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
    )

    if (result == "success"):
        return jsonify({
            "success": result,
            "id": message}), 200
    else:
        return jsonify({
            "success": result,
            "error": message
        }), 200

if __name__ == '__main__':
    app.run()
