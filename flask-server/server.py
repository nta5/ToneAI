from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS
from classify_sentiment import get_sentiment_result
from classify_spam import get_spam_result
from summarize import summarize

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API routes and endpoints to get data
@app.route('/')
def index():
	return {'message': 'Hello, this is fraudAI!'}

@app.route("/spam", methods=["POST"])
def spam():
	text = request.json["paragraph"]
	options = request.json["options"]
	processed_text = text

	responseData = {"summary": summarize(processed_text)}
	for option in options:
		if option == "spam":
			spam = get_spam_result(processed_text)
			responseData["spam"] = spam
		elif option == "sentiment":
			sentiment = get_sentiment_result(processed_text)
			responseData["sentiment"] = sentiment

	response = jsonify(responseData)

	return response

if __name__ == '__main__':
	app.run(debug=True)
