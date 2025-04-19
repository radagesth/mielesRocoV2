# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/getPreviousOrder', methods=['GET'])
def get_previous_order():
    # Aquí puedes implementar la lógica para obtener pedidos anteriores si es necesario
    
    return jsonify({'message': 'No hay pedidos anteriores.'}), 404

@app.route('/api/saveCheckoutData', methods=['POST'])
def save_checkout_data():
    data = request.json
    form_data = data['formData']
    cart_data = data['cartData']

    # Formatear la fecha actual
    current_date = datetime.now().strftime("%Y-%m-%d")
    # Crear el nombre del archivo
    file_name = f"pedido_{form_data['name']}_{current_date}.txt"

    # Crear un string con los datos
    checkout_data = f"Nombre: {form_data['name']}\n" \
                    f"Telefono: {form_data['phone']}\n" \
                    f"Requiere entrega: {'Si' if form_data['delivery'] else 'No'}\n" \
                    f"Direccion: {form_data['address']}\n" \
                    f"Productos:\n"

    for item in cart_data:
        checkout_data += f"- {item['product']['name']} (Cantidad: {item['quantity']}, Precio: ${item['product']['price']})\n"

    try:
        # Guardar los datos en un archivo de texto con el nombre especificado
        with open(file_name, 'w') as txt_file:
            txt_file.write(checkout_data)
        return jsonify({'message': 'Datos guardados correctamente', 'fileName': file_name}), 200
    except Exception as e:
        return jsonify({'message': 'Error al guardar los datos', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host ="mielesroco.cl",debug = True)