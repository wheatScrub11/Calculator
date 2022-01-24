let allBtns = document.querySelectorAll(".btn") // Select all the buttons
   , theBody = document.querySelector("body") // Select the body element
   ,theEqualValue = document.querySelector(".the-equal-value")
   ,theStringValue = document.querySelector(".the-string-value")
   ,allNumberButtons = document.querySelectorAll(".isNumber") // Selects all buttons that are numbers
   ,operatorButtons = document.querySelectorAll(".isOperator") // Selects all operator buttons +, -, /, *
   ,equalsBtn = document.querySelector(".equals")
   ,thePoint = document.querySelector(".point")
   ,theCButton = document.querySelector(".c")
   ,theACButton = document.querySelector(".ac")
   ,thePosNegButton = document.querySelector(".pos-neg")
   ,thePointButton = document.querySelector(".point")
   ,theColorModeButton = document.querySelector(".color-mode")
   ,theCircle = document.querySelector(".circle")
   ,theCircleText = document.querySelector(".lORd")
   ,theMainContainer = document.querySelector(".main-container");


let globalCurrentString = [];
let clonArrayTest = [];
let holder2 = 0;
let holder3 = 0;
let holder4 = 0;
let holder5 = 0;
let holder6 = 0;

theColorModeButton.addEventListener("click", e=>{
    if(holder6 == 0){
        theBody.classList.add("toWhite")
        theMainContainer.classList.add("toWhite")
        theColorModeButton.classList.add("lightMain")
        theCircle.classList.add("circleLightMain")
        theCircleText.classList.add("lORdLightMain")
        theCircleText.textContent = "Dark"
        theStringValue.style.cssText = "color:black;"
        theEqualValue.style.cssText = "color:black"
        holder6 = 1;
    }else if(holder6 == 1){
        theBody.classList.remove("toWhite")
        theMainContainer.classList.remove("toWhite")
        theColorModeButton.classList.remove("lightMain")
        theCircle.classList.remove("circleLightMain")
        theCircleText.classList.remove("lORdLightMain")
        theCircleText.textContent = "Light"
        theStringValue.style.cssText = "color:white;"
        theEqualValue.style.cssText = "color:white"
        holder6 = 0;
    }
})

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) =>{
    let result = a / b;
    let rounded = Math.round((result + Number.EPSILON) * 1000) / 1000
    return parseFloat(rounded); //Round the result to a maximum of 3 decimals
}
const operate = function([a, operator, b]){
    if(operator == "+"){
        return [add(a, b)]
    }else if(operator == "−"){
        return [subtract(a, b)]
    }else if(operator == "x"){
        return [multiply(a, b)]
    }else if(operator == "/"){
        return [divide(a, b)]
    }
}

/* Add a eventListener for each btn.
 * When any of the bts is on "mousedown" event, some CSS properties will be applied temporarily.*/
allBtns.forEach(element => {
    element.addEventListener("mousedown", e => element.style.cssText = "cursor:default;background-color:yellow;transform:scale(0.92, 0.92);color:black;")
});

/*When the mouse is on "mouseup" event in any place of the page, the original buttons styles will be restored*/
 allBtns.forEach(element => {
    theBody.addEventListener("mouseup", e => element.style.cssText = "cursor:pointer;")
})

allNumberButtons.forEach(element => {
    element.addEventListener("click", e =>{
        holder4 = 0;
        globalCurrentString.push(parseFloat(element.textContent));
        pasteStringOnMainBox();
    })
});

differentOperators = ["/", "x", "−", "+"]

for(let i = 0; i < operatorButtons.length; ++i){
    operatorButtons[i].addEventListener("click", e =>{

        let holder = 0;
        ++holder4;
        globalCurrentString.push((differentOperators[i]));

        holder4 >= 2 ? globalCurrentString.pop() : false
        if((globalCurrentString[0] == "+") || (globalCurrentString[0] == "−") || (globalCurrentString[0] == "/") || (globalCurrentString[0] == "x")){
            globalCurrentString.pop();
        }
        
        pasteStringOnMainBox();

        for(let i = 0; i < globalCurrentString.length; ++i){
            let jj = globalCurrentString[i]
            if((jj == "+") || (jj == "−") || (jj == "/") || (jj == "x")){
                ++holder;
            }
        }

        if(holder == 2){
            holder = 0;
            globalCurrentString = globalCurrentString.slice(0, globalCurrentString.length - 1)
            sus();
            globalCurrentString.push((differentOperators[i]));
            pasteStringOnMainBox();
        }
        
    })
}

const concatBeforeAfterOperator = function(globalCurrentString){
    let a = "";
    let b = "";
    let indexOfOperator = globalCurrentString.indexOf("+")
    let currentOperator = "+";
    if(indexOfOperator == -1){
        indexOfOperator = globalCurrentString.indexOf("−")
        currentOperator = "−";
    }if(indexOfOperator == -1){
        indexOfOperator = globalCurrentString.indexOf("/")
        currentOperator = "/";
    }if(indexOfOperator == -1){
        indexOfOperator = globalCurrentString.indexOf("x")
        currentOperator = "x";
    }
    
    for(let i = 0; i < indexOfOperator; ++i){
        a += globalCurrentString[i]
    }
    for(let i = indexOfOperator + 1; i < globalCurrentString.length; ++i){
        b += globalCurrentString[i]
    }

    clonArrayTest = [parseFloat(a), currentOperator, parseFloat(b)]
    return [parseFloat(a), currentOperator, parseFloat(b)]
}

const pasteResultOnMainBox = function(theResult){
    theEqualValue.textContent = `${theResult}`
}
const pasteStringOnMainBox = function(){
    theStringValue.textContent = `${globalCurrentString}`
}

equalsBtn.addEventListener("click", e =>{
    let a = 0, b = 0, c = 0, d = 0;

    globalCurrentString.forEach(element => {
        element == "+" ? ++a : false
        element == "−" ? ++b : false
        element == "/" ? ++c : false
        element == "x" ? ++d : false
    });

    if(globalCurrentString == ""){
        
    }else if((a == 0) || (b == 0) || (c == 0) || (d == 0)){
    }
    if((a == 1) || (b == 1) || (c == 1) || (d == 1)){
        sus();
        pasteStringOnMainBox();    
    }
})

const sus = function(){
    let arrayToOperate = concatBeforeAfterOperator(globalCurrentString);
    let operationResult = operate(arrayToOperate)
    pasteResultOnMainBox(operationResult)
    globalCurrentString = operationResult;
}

theCButton.addEventListener("click", e =>{
    try {globalCurrentString = globalCurrentString.slice(0, globalCurrentString.length - 1);} catch (DontWorry) {}   
    pasteStringOnMainBox();
})

theACButton.addEventListener("click", e =>{
    globalCurrentString = [];
    pasteStringOnMainBox();
    theEqualValue.textContent = "0";
})

thePointButton.addEventListener("click", e =>{
    let whatsThatIndex, zz, zz2, zz2Index;
    globalCurrentString.push(".") 

    globalCurrentString.forEach(element => {
        let jj = element;
        ((jj == "+") || (jj == "−") || (jj == "/") || (jj == "x")) ? whatsThatIndex = globalCurrentString.indexOf(jj) : false
    });

    if(whatsThatIndex != undefined){
        globalCurrentString.push(".") 
        for(let i = whatsThatIndex; i < globalCurrentString.length; ++i){
            zz = globalCurrentString[i]
            if(zz == "."){
                zz2 = globalCurrentString.indexOf(zz);
                for(let k = zz2 + 1; k < globalCurrentString.length; ++k){
                    zz2Index = globalCurrentString[k];
                    if(zz2Index == "."){
                        globalCurrentString.pop();
                    }
                }
            }
        }

    }else if(whatsThatIndex == undefined){
        for(let i = 0; i < globalCurrentString.length; ++i){
            zz = globalCurrentString[i]
            if(zz == "."){
                zz2 = globalCurrentString.indexOf(zz);
                for(let k = zz2 + 1; k < globalCurrentString.length; ++k){
                    zz2Index = globalCurrentString[k];
                    if(zz2Index == "."){
                        globalCurrentString.pop();
                    }
                }
            }
        }
    }
    pasteStringOnMainBox();
})

thePosNegButton.addEventListener("click", e =>{
    let whatsThatIndex2;
    
    globalCurrentString.forEach(element => {
        let gg = element;
        ((gg == "+") || (gg == "−") || (gg == "/") || (gg == "x")) ? whatsThatIndex2 = globalCurrentString.indexOf(gg) : false
    });

    if(whatsThatIndex2 != undefined){

        if(holder3 == 0){
            globalCurrentString.splice(whatsThatIndex2 + 1, 0, "-"); //Unicode U+2212 	−
            holder3 = 1;
        }else if(holder3 == 1){
            globalCurrentString.splice(whatsThatIndex2 + 1, 1);
            holder3 = 0;
        }

    }else if(whatsThatIndex2 == undefined){
        if(holder2 == 0){
            globalCurrentString.unshift("-"); //Unicode U+2212 	−
            holder2 = 1;
        }else if(holder2 == 1){
            globalCurrentString.shift();
            holder2 = 0;
        }
    }
    pasteStringOnMainBox();
})