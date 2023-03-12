from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API routes and endpoints to get data
@app.route('/')
def index():
	return {'message': 'Hello, World!'}

@app.route("/spam", methods=["POST"])
def spam():
	print(request.json)
	text = request.json["name"]
	processed_text = text.upper()

	response = jsonify(name=processed_text)

	return response

if __name__ == '__main__':
	app.run(debug=True)
