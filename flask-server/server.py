from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API routes and endpoints to get data
@app.route('/')
def index():
	return {'message': 'Hello, this is fraudAI!'}

@app.route("/spam", methods=["POST"])
def spam():
	print(request.json)
	text = request.json["paragraph"]
	options = request.json["options"]
	processed_text = text.upper()

	response = jsonify(paragraph=processed_text, options=options)

	return response

if __name__ == '__main__':
	app.run(debug=True)
