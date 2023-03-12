import os

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API routes and endpoints to get data
@app.route('/')
def index():
	print(os.getenv('COHERE_API_KEY'))

	response_body = {
		"name": "FraudAI",
		"about": "Hello, this is fraudAI"
	}
	return response_body

if __name__ == '__main__':
	app.run(debug=True)
