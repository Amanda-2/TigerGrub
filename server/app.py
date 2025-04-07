from flask import Flask, jsonify, request
from flask_cors import CORS
from server import database

app = Flask(__name__)

CORS(app)
app.debug = True

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
    print(data)
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

if __name__ == '__main__':
    app.run()
