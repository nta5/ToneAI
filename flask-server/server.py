from flask import Flask, redirect, url_for, request, render_template
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API routes and endpoints to get data
@app.route('/')
def index():
	return render_template('index.html')

@app.route("/spam", methods=["POST"])
def spam():
	text = request.form['input_text']
	processed_text = text.upper()

	return processed_text()

if __name__ == '__main__':
	app.run(debug=True)
