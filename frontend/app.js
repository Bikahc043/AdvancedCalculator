const operationSelect = document.getElementById('operation');
const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const calculatorForm = document.getElementById('calculator');
const resultDisplay = document.getElementById('result');


operationSelect.addEventListener('change', () => {
    const selectedOperation = operationSelect.value;

    if (['sin', 'cos', 'tan'].includes(selectedOperation)) {
        bInput.style.display = 'none';
        bInput.value = ''; 
        aInput.placeholder = 'Enter degree'; 
    } else {
        bInput.style.display = ''; 
        aInput.placeholder = 'Enter the first number'; 
        bInput.placeholder = 'Enter the second number';
    }
});

// Handle form submission
calculatorForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const a = parseFloat(aInput.value);
    const bInputValue = bInput.value;
    const b = bInputValue ? parseFloat(bInputValue) : null; 
    const operation = operationSelect.value;

    // Input validation for arithmetic and trigonometric operations
    if (
        isNaN(a) || 
        (['add', 'subtract', 'multiply', 'divide'].includes(operation) && isNaN(b))
    ) {
        resultDisplay.innerText = "Error: Please provide valid inputs.";
        return;
    }

    const data = { operation: operation, a: a, b: b };

    const response = await fetch('https://advancedcalculator-5.onrender.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.result) {
        resultDisplay.innerHTML = ""; // Clear previous result
        if (['sin', 'cos', 'tan'].includes(operation)) {
            katex.render(result.result, resultDisplay); // Render LaTeX for trigonometric results
        } else {
            resultDisplay.innerText = `Result: ${result.result}`; // Plain text for arithmetic results
        }
    } else {
        resultDisplay.innerText = `Error: ${result.error}`;
    }
});
