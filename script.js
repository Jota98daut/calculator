const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');


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

function operate(operator, a, b) {
    return (operator == 'add') ? add(a, b) :
           (operator == 'subtract') ? subtract(a, b) :
           (operator == 'multiply') ? multiply(a, b) :
           (operator == 'divide') ? divide(a, b) :
           0;
    
}

