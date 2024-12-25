from flask import Flask, request, jsonify
from flask_cors import CORS
from sympy import symbols, sin, cos, tan, pi, simplify, latex

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Advanced Calculator API!"

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    operation = data.get('operation')
    numbers = data.get('numbers')  # List of input numbers

    try:
        # Basic Arithmetic Operations
        if operation == "add":
            result = sum(numbers)
        elif operation == "subtract":
            result = numbers[0] - sum(numbers[1:])
        elif operation == "multiply":
            result = 1
            for num in numbers:
                result *= num
        elif operation == "divide":
            result = numbers[0]
            for num in numbers[1:]:
                if num == 0:
                    return jsonify({"error": "Cannot divide by zero"}), 400
                result /= num

        # Trigonometric Operations
        elif operation == "sin":
            angle = (numbers[0] * pi) / 180  # Convert degrees to radians
            result = latex(simplify(sin(angle)))
        elif operation == "cos":
            angle = (numbers[0] * pi) / 180
            result = latex(simplify(cos(angle)))
        elif operation == "tan":
            angle = (numbers[0] * pi) / 180
            result = latex(simplify(tan(angle)))

        # Unsupported operation
        else:
            return jsonify({"error": "Unsupported operation"}), 400

        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
