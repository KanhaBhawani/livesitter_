from flask_cors import CORS
from flask import Flask, jsonify, request, session, redirect, url_for
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from .models import OverLays

app = Flask(__name__)
CORS(app)

# Your MongoDB connection setup
app.config["MONGO_URI"] = 'mongodb+srv://ghanishtsinghal:svnit.bhawani@cluster0.yh82bys.mongodb.net/?retryWrites=true&w=majority'
# app.config["SECRET_KEY"] = "93f9b1c66ebed8edb26c18a4af41f65c1f7131df0878a497460e39dbca2c69c7"
# app.config['SESSION_COOKIE_SECURE'] = True
# app.config['SESSION_DEBUG'] = True
# app.config['UPLOAD_FOLDER'] = 'static/uploads'




mongo = PyMongo(app)
print(mongo)

client = MongoClient('mongodb+srv://ghanishtsinghal:svnit.bhawani@cluster0.yh82bys.mongodb.net/?retryWrites=true&w=majority', server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    # client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    print(client.db.getCollectionNames())
except Exception as e:
    print(e)

# Import routes after initializing Flask app and MongoDB
from .routes import *