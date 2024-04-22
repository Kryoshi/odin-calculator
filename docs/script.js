let firstOperand, secondOperand, operator;

function add() {
    return firstOperand + secondOperand;
}

function subtract() {
    return firstOperand - secondOperand;
}

function multiply() {
    return firstOperand * secondOperand;
}

function divide() {
    return firstOperand / secondOperand;
}

function compute() {
    let result;
    switch (operator) {
        case '+':
            result = add();
        break;
        case '-':
            result = subtract();
        break;
        case '*':
            result = multiply();
        break;
        case '/':
            result = divide();
        break;
        default:
            error();
    }
    console.log(result);
}