# Advanced Calculator

Advanced Calculator is a web-based calculator application that performs basic arithmetic and trigonometric operations. It is built using HTML, CSS, and JavaScript for the frontend and Flask for the backend. The app allows users to perform operations like addition, subtraction, multiplication, division, sine, cosine, and tangent calculations.

## Features

- **Basic Arithmetic Operations:** Addition, subtraction, multiplication, and division.
- **Trigonometric Operations:** Sine, cosine, and tangent.
- **Dynamic Input Fields:** Automatically adjusts input fields based on the selected operation.
- **Responsive Design:** Works seamlessly across devices.
- **LaTeX Rendering:** Displays trigonometric results in LaTeX format.

## Technology Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Flask (Python)
- SymPy for mathematical calculations
- Flask-CORS for handling cross-origin requests

## Installation and Usage

### Prerequisites
- Python 3.x
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<bikashc043>/AdvancedCalculator.git
   cd AdvancedCalculator
2. Create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
3. Activate the virtual environment:
    ```bash
    venv\Scripts\activate
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
5. Run the Flask application:
    python app.py
