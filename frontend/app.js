const operationSelect = document.getElementById('operation');
const inputFieldsContainer = document.getElementById('input-fields');
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

    // Validate inputs
    if (numbers.length === 0 || (operation === 'divide' && numbers.includes(0))) {
        resultDisplay.innerText = "Error: Please provide valid inputs.";
        return;
    }

    // Prepare data for API
    const data = { operation: operation, numbers: numbers };

    const response = await fetch('https://advancedcalculator-5.onrender.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    // Display result
    if (result.result) {
        resultDisplay.innerHTML = "";
        if (['sin', 'cos', 'tan'].includes(operation)) {
            katex.render(result.result, resultDisplay);
        } else {
            resultDisplay.innerText = `Result: ${result.result}`;
        }
    } else {
        resultDisplay.innerText = `Error: ${result.error}`;
    }
});
