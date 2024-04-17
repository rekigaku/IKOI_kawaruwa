# 必要なライブラリのインポート
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from db_control import mymodels, crud
from datetime import datetime


# Flaskアプリのインスタンスを生成。CORSによって、異なるドメインからのappへのリクエストを許可。
app = Flask(__name__)
CORS(app)

# Flaskトップページの表示
@app.route('/')
def index():
    return "WELCOME to IKOI app"

# employee_idとrecord_dateの期間を指定することで、特定の人、期間のrecordsデータを返すAPI
# 山脇変更　get_records ⇒　get_filterd_recordsに変更
@app.route('/get_filtered_records', methods=['POST'])
def get_records():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    values = request.get_json()

    try:
        employee_id = values['employee_id']  # 文字列のまま使用
        from_date = datetime.strptime(values['from_date'], '%Y-%m-%d')
        to_date = datetime.strptime(values['to_date'], '%Y-%m-%d')
    except KeyError as e:
        return jsonify({'error': f'Missing data for key: {e}'}), 400
    except ValueError as e:
        return jsonify({'error': f'Invalid date format or data type: {e}'}), 400

    result = crud.get_filtered_records(employee_id, from_date, to_date)
    if result:
        return jsonify(result), 200
    else:
        return jsonify({'error': 'No records found for the provided employee ID and date range'}), 404

# employee_idを指定することで、その人のrecordsが表示されるAPI
#山脇変更　get_action_date ⇒　get_filterd_actions
@app.route('/get_filtered_actions', methods=['POST'])
def get_action_data():
    if not request.is_json:
        return jsonify({"error": "Request body must be JSON"}), 400

    value = request.get_json()
    employee_id = value.get('employee_id')

    if employee_id is None:
        return jsonify({"error": "Missing employee_id"}), 400

    try:
        result = crud.get_filtered_actions(employee_id)
        if not result:
            return jsonify({"error": "No actions found"}), 404
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# employee_idとrecord_dateとaction_idを渡すことで、recordsテーブルにデータを追加するAPI
@app.route('/add_new_record', methods=['POST'])
def add_records():
    data = request.get_json()
    employee_id = data['employee_id']
    record_date = datetime.strptime(data["record_date"], "%Y-%m-%d").date()
    error_occurred = False
    error_message = ""
    
    for action_id in data['action_ids']:
        values = {
            'employee_id': employee_id,
            'record_date': record_date,
            'action_id': action_id,
        }
        response = crud.add_new_record(mymodels.Records, values)
        if "error" in response:
            error_occurred = True
            error_message = response
            break  # エラーが発生したらループを中断

    if error_occurred:
        return jsonify({"message": error_message}), 500  # エラーメッセージとHTTPステータス500を返す
    else:
        return jsonify({"message":"All records inserted"}), 200
    
    
#ログイン画面接続用のAPI　POSTで設定　///山脇追加分
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
    
    employee = crud.validate_employee_login(email, password)
    if employee:
        # パスワードフィールドは返さない
        return jsonify({"employee_id": employee.employee_id, "employee_name": employee.employee_name, "email": employee.email}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401



# frontend側のfetchtest用のAPI。jsonplaceholderというサービスを利用。
@app.route("/fetchtest")
def fetchtest():
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    return response.json(), 200


if __name__ == '__main__':
    app.run(debug=True)