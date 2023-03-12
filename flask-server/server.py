from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS
from classify_sentiment import classify_sentiment
from classify_spam import classify_spam
from summarize import summarize

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

	responseData = {"paragraph":processed_text}
	for option in options:
		if option == "spam":
			spam = classify_spam(processed_text)
			responseData["spam"] = "spam received"
		elif option == "sentiment":
			sentiment = classify_sentiment(processed_text)
			responseData["sentiment"] = "sentiment received"

	summary=summarize(processed_text)

	response = jsonify(responseData)

	return response

if __name__ == '__main__':
	app.run(debug=True)
