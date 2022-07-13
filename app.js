const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Enter 2nd number first')
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Enter a number first");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }
    if (calculator.operator === "-")  {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
    if (calculator.operator === "*")  {
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber)
    }
    if (calculator.operator === "/")  {
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber)
    }
    if (calculator.operator === "1/x")  {
        result = 1/parseInt(calculator.firstNumber) 
    }
    if (calculator.operator === "sin")  {
        result = Math.sin(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator === "cos")  {
        result = Math.cos(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator === "tan")  {
        result = Math.tan(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator === "log")  {
        result = Math.log10(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator === "ln")  {
        result = Math.log(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator === "sqrt")  {
        result = Math.sqrt(parseInt(calculator.firstNumber)) 
    }
    if (calculator.operator == "x^2")  {
        result = Math.pow(parseInt(calculator.firstNumber),2) 
    }
    if (calculator.operator == "x^3")  {
        result = Math.pow(parseInt(calculator.firstNumber),3)
    }
    if (calculator.operator == "|x|")  {
        result = Math.abs(parseInt(calculator.firstNumber))
    }


    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}