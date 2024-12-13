// Calculator Porgram

const display = document.getElementById("display");

function appendToDisplay(input){
display.value += input;

}

function clearDisplay(){
display.value = "";

}

function calculate() {
    try {
        let expression = display.value;
        let result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = "error";
    }
}

// Tokenize the expression (split into numbers, operators, parentheses)
function tokenize(expression) {
    let regex = /\d+(\.\d+)?|[-+*/^()%]/g;  // Match numbers, operators, and parentheses
    return expression.match(regex);
}

// Evaluate the mathematical expression using a secure approach
function evaluateExpression(expression) {
    let tokens = tokenize(expression);  // Tokenize the input string
    let result = parseExpression(tokens);  // Parse and evaluate the expression
    if (tokens.length > 0) {
        throw new Error("Invalid expression");
    }
    return result;
}

// Parse the expression with precedence handling
function parseExpression(tokens) {
    let result = parseTerm(tokens);

    while (tokens.length > 0) {
        let operator = tokens[0];
        if (operator === '+' || operator === '-') {
            tokens.shift();  // Remove the operator
            let nextTerm = parseTerm(tokens);
            if (operator === '+') result += nextTerm;
            else result -= nextTerm;
        } else {
            break;  // No more addition/subtraction
        }
    }

    return result;
}

// Parse terms (handles multiplication, division, and modulus)
function parseTerm(tokens) {
    let result = parseFactor(tokens);

    while (tokens.length > 0) {
        let operator = tokens[0];
        if (operator === '*' || operator === '/' || operator === '%') {
            tokens.shift();  // Remove the operator
            let nextFactor = parseFactor(tokens);
            if (operator === '*') result *= nextFactor;
            else if (operator === '/') {
                if (nextFactor === 0) throw new Error("Division by zero");
                result /= nextFactor;
            } else if (operator === '%') result %= nextFactor;
        } else {
            break;  // No more multiplication/division/modulus
        }
    }

    return result;
}

// Parse factors (handles numbers and parentheses)
function parseFactor(tokens) {
    let token = tokens.shift();

    if (token === '(') {
        let result = parseExpression(tokens);
        if (tokens.shift() !== ')') {
            throw new Error("Mismatched parentheses");
        }
        return result;
    } else if (token.match(/^\d+(\.\d+)?$/)) {
        return parseFloat(token);  // Return the number
    } else {
        throw new Error("Unexpected token: " + token);
    }
}

