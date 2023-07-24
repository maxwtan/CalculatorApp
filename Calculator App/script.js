let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen')

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length -1)
            }
            break;
        case'+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

        }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
    
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
    
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();


function handleBackArrow(){
    if(buffer.length === 1){
        buffer = '0';
    }else{
        buffer = buffer.substring(0, buffer.length -1)
    }
}

  

// Add event listener to capture keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const validKeys = /^[0-9+\-*/.=%\r\n]+$/; // Regular expression to validate allowed keys
  
    if (validKeys.test(key)) {
      event.preventDefault(); // Prevent default behavior for valid keys to avoid input in other elements
  
      if (key === '=') {
        buttonClick('='); // Call the buttonClick function with the '=' key
      } else if (key === 'Enter' || key === 'Return') {
        buttonClick('='); // Use the Enter/Return key as '=' for calculation
      } else if (key === '/') {
        buttonClick('÷'); // Call the buttonClick function with the '÷' key for division
      } else if (key === 'Backspace' || key === 'Delete') {
        handleBackArrow(); // Call the handleBackArrow function for the back arrow key
      } else {
        buttonClick(key); // Call the buttonClick function with the pressed key
      }
    }
});
