from flask import jsonify
from passlib.hash import pbkdf2_sha256
from flask_pymongo import PyMongo
from bson import ObjectId 

class OverLays:
    def __init__(self, position_x, position_y, dimention_x, dimention_y, file_url):
        self.position_x = position_x
        self.position_y = position_y
        self.dimention_x = dimention_x
        self.dimention_y = dimention_y
        self. file_url = file_url


    @staticmethod
    def create_overlay(db, overlay_data):
        print(overlay_data)
        return db.overlays.insert_one(overlay_data)

    @staticmethod
    def get_overlays(db):
        return db.overlays.find()

    @staticmethod
    def get_overlay_by_id(db, overlay_id):
        return db.overlays.find_one({'_id': ObjectId(overlay_id)})

    @staticmethod
    def update_overlay(db, overlay_id, updated_overlay_data):
        db.overlays.update_one({'_id': ObjectId(overlay_id)}, {'$set': updated_overlay_data})

    @staticmethod
    def delete_overlay(db, overlay_id):
        db.overlays.delete_one({'_id': ObjectId(overlay_id)})

    