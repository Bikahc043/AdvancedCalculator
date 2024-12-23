from flask import Flask, render_template, request
import math

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def calculator():
    result = None
    expression = None

    if request.method == "POST":
        try:
            # Get the expression input by the user
            expression = request.form.get("expression", "")
            
            # Handle the trigonometric and logarithmic functions
            expression = expression.lower()  # Convert to lowercase to handle cases like "Sin", "COS", "Tan"

            # If the user typed sin, cos, tan, or log, use math library functions
            if "sin" in expression:
                expression = expression.replace("sin", "math.sin")
            if "cos" in expression:
                expression = expression.replace("cos", "math.cos")
            if "tan" in expression:
                expression = expression.replace("tan", "math.tan")
            if "log" in expression:
                expression = expression.replace("log", "math.log")

            # Safely evaluate the expression
            result = eval(expression)

        except Exception:
            result = "Error"  # In case of an invalid expression

    return render_template("index.html", result=result, expression=expression)

if __name__ == "__main__":
    app.run(debug=True)

from flask_frozen import Freezer
freezer = Freezer(app)

if __name__ == "__main__":
    freezer.freeze()
