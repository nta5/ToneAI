from flask import Flask

app = Flask(__name__)

# API routes and endpoints to get data
@app.route('/')
def index():
	return 'Hello, World!'


if __name__ == '__main__':
	app.run(debug=True)