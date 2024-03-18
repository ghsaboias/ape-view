from flask import Flask, jsonify
from flask_cors import CORS
import requests
import urllib.parse

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    data = {'message': 'Hello from Flask API!'}  # Example data)
    print(jsonify(data))
    return jsonify(data)  # Return data as JSON

# Create route that takes one or many crypto symbol as a parameter, and a chain ID, and fetches it using this API: https://api.dexscreener.com/latest/dex/pairs/:chainId/:pairAddresses
# @app.route('/api/<chainId>/<pairAddresses>')
# def get_pairs(chainId, pairAddresses):
#     print("ACCESSING")
#     url = f"https://api.dexscreener.com/latest/dex/pairs/{chainId}/{pairAddresses}"
#     try:
#         response = requests.get(url)
#         print("response", response)
#         data = response.json()
#         print("data", data)
#         return jsonify(data)
#     except:
#         return jsonify({"error": "An error occurred while fetching data"})

@app.route('/api/<userSearch>')
def get_pair_from_string(userSearch):
    url = f"https://api.dexscreener.com/latest/dex/search?q={userSearch}"
    try:
        response = requests.get(url)
        data = response.json()
        return jsonify(data)
    except:
        return jsonify({"error": "An error occurred while fetching data"})


if __name__ == '__main__':
    app.run(debug=True)
