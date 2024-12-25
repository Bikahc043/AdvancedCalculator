const operationSelect = document.getElementById('operation');
const inputFieldsContainer = document.getElementById('input-fields');
const calculatorForm = document.getElementById('calculator');
const resultDisplay = document.getElementById('result');
const addInputButton = document.getElementById('add-input');
const removeInputButton = document.getElementById('remove-input');

// Function to reset the input fields
function resetInputs() {
    inputFieldsContainer.innerHTML = ''; // Clear all inputs
    const newInput = document.createElement('input'); // Create one default input
    newInput.type = 'number';
    newInput.className = 'number-input';
    newInput.placeholder = 'Enter a number';
    inputFieldsContainer.appendChild(newInput);
}

// Event listener for operation selection
operationSelect.addEventListener('change', () => {
    const selectedOperation = operationSelect.value;

    if (['sin', 'cos', 'tan'].includes(selectedOperation)) {
        // If a trigonometric function is selected
        resetInputs(); // Only one input field
        addInputButton.style.display = 'none'; // Hide Add Input button
        removeInputButton.style.display = 'none'; // Hide Remove Input button
    } else {
        // If an arithmetic function is selected
        resetInputs(); // Reset to one input field initially
        addInputButton.style.display = 'inline-block'; // Show Add Input button
        removeInputButton.style.display = 'inline-block'; // Show Remove Input button
    }
});

// Add a new input field
addInputButton.addEventListener('click', () => {
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.className = 'number-input';
    newInput.placeholder = 'Enter a number';
    inputFieldsContainer.appendChild(newInput);
});

// Remove the last input field
removeInputButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.number-input');
    if (inputs.length > 1) {
        inputFieldsContainer.removeChild(inputs[inputs.length - 1]);
    }
});

// Handle form submission
calculatorForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect all input values
    const inputs = document.querySelectorAll('.number-input');
    const numbers = Array.from(inputs).map(input => parseFloat(input.value)).filter(val => !isNaN(val));
    const operation = operationSelect.value;

    // Validate inputs
    if (numbers.length === 0 || (operation === 'divide' && numbers.includes(0))) {
        resultDisplay.innerText = "Error: Please provide valid inputs.";
        return;
    }

    // Prepare data for API
    const data = { operation: operation, numbers: numbers };

    // Send data to the backend
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
