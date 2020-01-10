function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

// Return the result of the specified operation
function operate(operator, a, b) {
    return (operator == 'add') ? add(a, b) :
           (operator == 'subtract') ? subtract(a, b) :
           (operator == 'multiply') ? multiply(a, b) :
           (operator == 'divide') ? divide(a, b) :
           0;
    
}

// Display the given values
function disp() {
    display.textContent = displayValue;
}

function evaluate(s) {
    let str = s;
    let operationsArr = str.split(' ');
    let result, portion, portionArr, portionResult, xIndex;
    while(str.includes('(')) {
        // Get the portion of the string in parentheses and evaluate it
        portion = s.slice(s.indexOf('(') + 1, s.indexOf(')'));
        portionResult = evaluate(portion);
        // Replace portion in parentheses with it's result
        str = str.replace(`(${portion})`, portionResult.toString());
    }
    while (str.includes('x') || str.includes('/')) {
        operationsArr = str.split(' ');
        xIndex = operationsArr.findIndex((item) => item == 'x' || item == '/');
        portionArr = [];
        portionArr[0] = operationsArr[xIndex-1];
        portionArr[1] = operationsArr[xIndex];
        portionArr[2] = operationsArr[xIndex+1];
        portion = portionArr.toString().replace(/,/g, ' ');
        if (portionArr[1] == 'x')
            portionResult = +portionArr[0] * +portionArr[2];
        else
            portionResult = +portionArr[0] / +portionArr[2];
        str = str.replace(portion, portionResult.toString());
    }

    while (str.includes('+') || str.includes('-')) {
        operationsArr = str.split(' ');
        portionArr = [operationsArr[0],operationsArr[1],operationsArr[2]]
        portion = portionArr.toString().replace(/,/g, ' ');
        if (portionArr[1] == '+')
            portionResult = +portionArr[0] + +portionArr[2];
        else
            portionResult = +portionArr[0] + +portionArr[2];
        str = str.replace(portion, portionResult.toString());
    }
    result = +str;
    
    return result;
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

let displayValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.value;
        if (value !== '=') {
            displayValue += value;
            disp();
        }
    });
});

