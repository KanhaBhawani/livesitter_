from flask import jsonify, request
from app import app, mongo, client
from app.models import OverLays

# 
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays_cursor = OverLays.get_overlays(client.db)
    overlays_list = list(overlays_cursor)
    for overlay in overlays_list:
        overlay['_id'] = str(overlay['_id'])  # Convert the ObjectId to a string
    return jsonify(overlays_list)
# 
@app.route('/api/overlays/<string:id>', methods=['GET'])
def get_overlay(id):
    overlays = OverLays.get_overlay_by_id(client.db,id)
    _id = overlays['_id']
    overlays['_id'] = f"{_id}"
    return overlays
# 
@app.route('/api/overlays', methods=['POST'])
def add_overlay():
    overlay_data = request.json
    print(overlay_data)
    OverLays.create_overlay(client.db, overlay_data)
    return jsonify({'message': 'Overlay added successfully'})

# 
@app.route('/api/overlays/<string:id>', methods=['PUT'])
def update_overlay(id):
    overlay_data = request.json
    OverLays.update_overlay(client.db,id,overlay_data)
    return jsonify({'message': 'Overlay updated successfully'})

# 
@app.route('/api/overlays/<string:id>', methods=['DELETE'])
def delete_overlay(id):
    OverLays.delete_overlay(client.db,id)
    return jsonify({'message': 'Overlay deleted successfully'})