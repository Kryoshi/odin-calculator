let operands = ["",""],
    operator = "",
    operandFlag = false;

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

function add() {
    return +operands[0] + +operands[1];
}

function subtract() {
    return +operands[0] - +operands[1];
}

function multiply() {
    console.log('enter');
    return +operands[0] * +operands[1];
}

function divide() {
    return +operands[0] / +operands[1];
}

function compute() {
    let result;
    console.log(operator)
    switch (operator) {
        case '+':
            result = add();
        break;
        case '-':
            result = subtract();
        break;
        case '×':
            result = multiply();
        break;
        case '÷':
            result = divide();
        break;
        default:
            error();
            result = 0;
    }
    operands[1] = '';
    operands[0] = result;
    operandFlag = false;
    display.textContent = result;
    console.log(result);
}

function clear() {
    operands[0] = '';
    operands[1] = '';
    operandFlag = false;
    display.textContent = '0';
}

function error() {
    clear();
    display.textContent = "ERROR";
}

buttons.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        let button = e.target;
        if (button.className.includes("digit")) {
            operands[Number(operandFlag)] += button.textContent;
            display.textContent = operands[Number(operandFlag)];
        }
        else if (button.className.includes("util")) {
            parseUtils(button.textContent);
        }
        else if (button.className.includes("operator")) {
            operator = button.textContent;
            if (operandFlag) {
                compute();
            } else {
                operandFlag = true;
            }
        }
    }
});

function parseUtils(util) {
    switch (util) {
        case '=':
            compute();
        break;
        case 'AC':
            clear();
        break;
        default:
            error();
    }
}
