# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json

from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
CORS(app)

# Suponiendo que tienes un archivo donde guardas los pedidos anteriores
previous_orders_file = 'previous_orders.json'  # Cambia esto según tu estructura

@app.route('/api/getPreviousOrder', methods=['GET'])
def get_previous_order():
    if os.path.exists(os.getcwd()):
        with open(previous_orders_file, 'r') as json_file:
            previous_order = json.load(json_file)
            return jsonify(previous_order), 200
    else:
        return jsonify({'message': 'No hay pedidos anteriores.'}), 404

@app.route('/api/saveCheckoutData', methods=['POST'])
def save_checkout_data():
    data = request.json
    form_data = data['formData']
    cart_data = data['cartData']
    file_name = data['fileName']

    # Crear un diccionario con los datos
    checkout_data = {
        'formData': form_data,
        'cartData': cart_data
    }

    # Guardar los datos en un archivo JSON
    with open(previous_orders_file, 'w') as json_file:
        json.dump(checkout_data, json_file, indent=4)

    return jsonify({'message': 'Datos guardados correctamente'}), 200

if __name__ == '__main__':
    app.run(debug=True)