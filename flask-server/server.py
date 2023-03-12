from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS
from classify_sentiment import get_sentiment_result, get_sentiment_percentage
from classify_spam import get_spam_result, get_spam_percentage
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

	responseData = {}
	for option in options:
		if option == "spam":
			spam = get_spam_result(processed_text)
			spam_value = get_spam_percentage(processed_text)
			responseData["spam"] = spam
			responseData["spamValue"] = spam_value
		elif option == "sentiment":
			sentiment = get_sentiment_result(processed_text)
			sentiment_value = get_sentiment_percentage(processed_text)
			responseData["sentiment"] = sentiment
			responseData["sentimentValue"] = sentiment_value
		elif option == "summary":
			summary = summarize(processed_text)
			responseData["summary"] = summary

	response = jsonify(responseData)

	return response

if __name__ == '__main__':
	app.run(debug=True)
