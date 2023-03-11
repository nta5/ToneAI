from flask import Flask

app = Flask(__name__)

# API routes and endpoints to get data
@app.route('/members')
def members():
	return {"members": ["John", "Paul", "George", "Ringo"]}


if __name__ == '__main__':
	app.run(debug=True)
