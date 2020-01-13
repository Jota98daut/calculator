const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

let result, displayValue, isOp;
let isResolved = false;

// What to show on the display
function populateDisplay(s, btnType) {
    // If the current value is a result from a previous operation, 
    // clean the screen
    if (isResolved == true) {
        if (btnType != 'operation') {
            display.textContent = '';
        }
        isResolved = false;
    }

    if(s == 'clear') 
        display.textContent = '';
    else if (s == '/' || s == 'x' || s == '-' || s == '+')
        display.textContent += ` ${s} `;
    else if (s != '=')
        display.textContent += s;
    return display.textContent;
}

// Resolve the given operation (taken as a string)
function resolve(opString) {
    let helper = opString;
    let opArray = [];
    let result, partialResult, opIndex;
    // While there are operations left
    while (helper.includes('x') || helper.includes('/') || helper.includes('+') || helper.includes('-')) {
        opArray = helper.split(' ');
        if (helper.includes('x')) {
            opIndex = opArray.indexOf('x');
            partialResult = +opArray[opIndex-1] * +opArray[opIndex+1];
            helper = helper.replace(`${opArray[opIndex-1]} x ${opArray[opIndex+1]}`, partialResult.toString());
        }
        else if (helper.includes('/')) {
            opIndex = opArray.indexOf('/');
            partialResult = +opArray[opIndex-1] / +opArray[opIndex+1];
            helper = helper.replace(`${opArray[opIndex-1]} / ${opArray[opIndex+1]}`, partialResult.toString());
        }
        else if (helper.includes(display.textContent = '+')) {
            opIndex = opArray.indexOf('+');
            partialResult = +opArray[opIndex-1] + +opArray[opIndex+1];
            console.log('To replace: ' + `${opIndex-1} + ${opIndex+1}` + 'from ' + helper);
            helper = helper.replace(`${opArray[opIndex-1]} + ${opArray[opIndex+1]}`, partialResult.toString());
            console.log(helper);
        }
        else if (helper.includes('-')) {
            opIndex = opArray.indexOf('-');
            partialResult = +opArray[opIndex-1] - +opArray[opIndex+1];
            helper = helper.replace(`${opArray[opIndex-1]} - ${opArray[opIndex+1]}`, partialResult.toString());
        }
    }
    result = partialResult;
    return result;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        isOp = button.classList[1];
        if (button.value != '=') {
            displayValue = populateDisplay(button.value, isOp);
        }
        else {
            display.textContent = resolve(displayValue).toString();
            isResolved = true;
        }
    });
});