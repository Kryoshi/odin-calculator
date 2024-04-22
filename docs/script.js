const OPERANDS = {
    first: 0,
    second: 1
};

const operands = ["0","0"];
let operator = "",
    currentOperand = OPERANDS.first;
let resetOnNext = false;
let isOperatorQueued = false;

const displayText = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

function add() {
    return +operands[OPERANDS.first] + +operands[OPERANDS.second];
}

function subtract() {
    return +operands[OPERANDS.first] - +operands[OPERANDS.second];
}

function multiply() {
    return +operands[OPERANDS.first] * +operands[OPERANDS.second];
}

function divide() {
    return +operands[OPERANDS.first] / +operands[OPERANDS.second];
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
    operands[OPERANDS.first] = result.toString();
    operands[OPERANDS.second] = '';
    currentOperand = OPERANDS.first;
    resetOnNext = true;
    display();
}

function del() {
    if (!isFinite(+operands[currentOperand])) {
        clear();
    }
    else if (!isNaN(+operands[currentOperand]) && operands[currentOperand].includes("e")) {
        operands[currentOperand] = (+operands[currentOperand] / 10).toString();
    }
    else if (!isNaN(+operands[currentOperand])) {
        operands[currentOperand] = operands[currentOperand].slice(0, -1)
    }
    display();
}

function clear() {
    operands[0] = '';
    operands[1] = '';
    currentOperand = OPERANDS.first;
    resetOnNext = false;
    isOperatorQueued = false;
    display();
}

function display(text = operands[currentOperand]) {
    if (text == '') {
        text = "0";
        operands[currentOperand] = "0";
    }
    else if (text.length > 12) {
        text = (+text).toExponential(8);
    }
    displayText.textContent = text;
}

function error() {
    clear();
    display("ERROR");
}

buttons.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        let button = e.target;
        if (button.className.includes("digit")) {
            isOperatorQueued = false;
            if (resetOnNext || operands[currentOperand] === "0") {
                resetOnNext = false;
                operands[currentOperand] = button.textContent;
            } else {
                operands[currentOperand] += button.textContent;
            }
            display();
        }
        else if (button.className.includes("util")) {
            isOperatorQueued = false;
            parseUtils(button.textContent);
        }
        else if (button.className.includes("operator")) {
            operator = button.textContent;
            if (isOperatorQueued) {
                isOperatorQueued = false;
                operands[OPERANDS.second] = operands[OPERANDS.first]
                compute();
            }
            else if (currentOperand === OPERANDS.second) {
                compute();
            } else {
                currentOperand = OPERANDS.second;
            }
            isOperatorQueued = true;
        }
        else {
            error();
        }
    }
});

function parseUtils(util) {
    switch (util) {
        case '=':
            if (currentOperand === OPERANDS.second)
                compute();
        break;
        case '.':
            if (!operands[currentOperand].includes(".")) {
                operands[currentOperand] += ".";
                display();
            }
        break;
        case '±':
            if (!(operands[currentOperand] === "0")) {
                console.log('enter')
                if (!operands[currentOperand].includes("-")) {
                    operands[currentOperand] = "-" + operands[currentOperand];
                }
                else {
                    operands[currentOperand] = operands[currentOperand].slice(1);
                }
            }
            display();
        break;
        case 'C':
            del();
        break;
        case 'AC':
            clear();
        break;
        default:
            error();
    }
}
