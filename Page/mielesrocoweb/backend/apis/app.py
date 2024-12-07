# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

BACKUP_FOLDER = 'backups'  
EMAIL_USER = ''
EMAIL_PASSWORD = ''
EMAIL_DESTINATARY = ''

app = Flask(__name__)
CORS(app)

# Aseguramos que la carpeta de backups exista
os.makedirs(BACKUP_FOLDER, exist_ok=True)

current_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
previous_orders_file = f'{BACKUP_FOLDER}/previous_orders_{current_date}.json'

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
        'cartData': cart_data,
    }

    # Guardar los datos en un archivo JSON
    with open(previous_orders_file, 'w') as json_file:
        json.dump(checkout_data, json_file, indent=4)

    return jsonify({'message': 'Datos guardados correctamente'}), 200

def send_email_with_backups():
    files = [os.path.join(BACKUP_FOLDER, f) for f in os.listdir(BACKUP_FOLDER) if f.endswith('.json')]

    if not files:
        print("No hay archivos para enviar.")
        return jsonify({'message': 'No hay archivos para enviar.'}), 404

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = EMAIL_DESTINATARY  # Cambiar por el destinatario
        msg['Subject'] = f"Respaldo de pedidos - {datetime.now().strftime('%Y-%m-%d')}"

        body = "Adjunto se encuentran los respaldos de los pedidos."
        msg.attach(MIMEText(body, 'plain'))

        for previous_orders_file in files:
            with open(previous_orders_file, 'rb') as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(previous_orders_file)}')
                msg.attach(part)

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)

        for previous_orders_file in files:
            os.remove(previous_orders_file)
            print(f"Archivo eliminado: {previous_orders_file}")

        return jsonify({'message': 'Correo enviado y archivos eliminados correctamente'}), 200

    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        return jsonify({'message': 'Error al enviar el correo', 'error': str(e)}), 500

@app.route('/api/sendEmail', methods=['POST'])
def send_email():
    return send_email_with_backups()

if __name__ == '__main__':
    app.run(debug=True)