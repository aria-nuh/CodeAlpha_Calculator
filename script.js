const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if(button.classList.contains("clear")) {
            currentInput = "";
            display.value = "";
            resultDisplayed = false;
            return;
        }

        if(button.classList.contains("delete")) {  
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
            return;
        }

        if(button.classList.contains("equal")) {
            try {
                const finalInput = currentInput.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
                const result = eval(finalInput);
                display.value = result;
                currentInput = result.toString();
                resultDisplayed = true;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
            return;
        }

        if(resultDisplayed && /[0-9.]/.test(value)) {
            currentInput = "";
            resultDisplayed = false;
        }

        currentInput += value;
        display.value = currentInput;
    });
});

// ===== BONUS: Keyboard Support =====
document.addEventListener("keydown", (e) => {
    if(e.key >= 0 && e.key <= 9) appendInput(e.key);
    if(["+", "-", "*", "/"].includes(e.key)) appendInput(e.key.replace("*","×").replace("/","÷").replace("-","−"));
    if(e.key === "Enter") document.querySelector(".equal").click();
    if(e.key === "Backspace") currentInput = currentInput.slice(0,-1), display.value=currentInput;
    if(e.key.toLowerCase() === "c") document.querySelector(".clear").click();
});

function appendInput(val){
    if(resultDisplayed) { currentInput=""; resultDisplayed=false; }
    currentInput += val;
    display.value = currentInput;
}
