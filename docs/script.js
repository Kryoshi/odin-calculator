const OPERANDS = {
    first: 0,
    second: 1
};

const operands = ["0","0"];
const operandsOld = ["0","0"];
let operator = "",
    currentOperand = OPERANDS.first;
let resetOnNext = false;
let isOperatorQueued = false;

const displayMain = document.querySelector(".display .main");
const displayQueue = document.querySelector(".display .queue");
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
    operandsOld[OPERANDS.first] = operands[OPERANDS.first];
    operandsOld[OPERANDS.second] = operands[OPERANDS.second];
    operands[OPERANDS.first] = result.toString();
    operands[OPERANDS.second] = "0";
    resetOnNext = true;
    console.log(result)
    display(operands[OPERANDS.first]);
    currentOperand = OPERANDS.second;
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
    operands[OPERANDS.first] = "0";
    operands[OPERANDS.second] = "0";
    operandsOld[OPERANDS.first] = "0";
    operandsOld[OPERANDS.second] = "0";
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
    displayMain.textContent = text;
    updateDisplayQueue();
}

function updateDisplayQueue() {
    let text
    if (resetOnNext) {
        text = `${operandsOld[OPERANDS.first]} ${operator} ${operandsOld[OPERANDS.second]}
         = ${operands[OPERANDS.first]}`;
    } else if (currentOperand === OPERANDS.first && operands[OPERANDS.first] != "0") {
        text = `${operands[OPERANDS.first]}`;
    } else if (currentOperand === OPERANDS.second && operands[OPERANDS.second] != "0") {
        text = `${operands[OPERANDS.first]} ${operator} ${operands[OPERANDS.second]}`;
    } else if (currentOperand === OPERANDS.second) {
        text = `${operands[OPERANDS.first]} ${operator}`;
    }
    displayQueue.textContent = text;
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
                if(resetOnNext) {
                    resetOnNext = false;
                    clear();
                }
                operands[currentOperand] = button.textContent;
            } else {
                operands[currentOperand] += button.textContent;
            }
            display();
        }
        else if (button.className.includes("util")) {
            isOperatorQueued = false;
            parseUtils(button.textContent);
            updateDisplayQueue()
        }
        else if (button.className.includes("operator")) {
            if (isOperatorQueued) {
                isOperatorQueued = false;
                operands[OPERANDS.second] = operands[OPERANDS.first]
                compute();
            }
            else if (currentOperand === OPERANDS.second) {
                compute();
            }
            else {
                currentOperand = OPERANDS.second;
            }
            resetOnNext = false;
            isOperatorQueued = true;
            operator = button.textContent;
            updateDisplayQueue()
        }
        else {
            error();
        }
        console.log(button.className + ` ${operands[OPERANDS.first]} ${operands[OPERANDS.second]}\noperand: ${currentOperand}`)
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
