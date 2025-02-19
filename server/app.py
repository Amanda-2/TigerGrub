from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
app.debug = True


@app.route('/api/test', methods=['GET'])
def run_connection_test():
    print("got here")
    items = "Test has succeeded"
    return jsonify(items)