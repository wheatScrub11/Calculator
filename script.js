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
   ,theMainContainer = document.querySelector(".main-container")
   ,thatBorderBottom = document.querySelector(".the-equal")
   ,whatIsTheKey;


let globalCurrentString = [];
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
        thatBorderBottom.style.cssText = "border-bottom:1px solid #0000000c;"
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
        thatBorderBottom.style.cssText = "border-bottom:1px solid #fffffffc;"
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

/*
    1. Search the index of any operator
    2. Get the operator in one variable (currentOperator)
    3. For all the numbers before the operator in the array, concat them in one single variable (a)
    4. For all the numbers after the operator in the array, concat them in one single variable (b)
    5. Always return an array of 3 elements [a, currentOperator, b], so this way, the "sus" function will be able to operate the array
*****/
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

    return [parseFloat(a), currentOperator, parseFloat(b)]
}

/*For all number buttons (0,1,2,3...) do the forAllNumberFunction*/
allNumberButtons.forEach(element => {
    element.addEventListener("click", e =>{
        forAllNumberFunction(parseFloat(element.textContent));
    })
});

/*Because i couldnt apply the text content of the operators box (as i did with allNumberButtons), i decided to put every operator in
an array to select them later*/
differentOperators = ["/", "x", "−", "+"]
/*For all operator buttons (+,-,/,x) do the forAllOperatorsFunction*/
for(let i = 0; i < operatorButtons.length; ++i){
    operatorButtons[i].addEventListener("click", e =>{
        forAllOperatorsFunction(differentOperators[i]);
    })
}

/*Function that paste the current result of the operations in the "theEqualValue" box */
const pasteResultOnMainBox = function(theResult){
    theEqualValue.textContent = `${theResult}`
}
/*Function that paste the current array in the "theStringValue" box, this way, the user can see the current numbers and operators inputs */
const pasteStringOnMainBox = function(){
    let pepe = "";
    globalCurrentString.forEach(element => {
        pepe += element;
    });
    theStringValue.textContent = `${pepe}`
}
/* for the "=" button, do "forTheEqualFunction"*/
equalsBtn.addEventListener("click", e =>{
    forTheEqualFunction();
})

/*This function do the necessary to operate the array and return the result on the string box, value box, and change the array
to a single element, which is the result with a typeof of number*/
const sus = function(){
    let arrayToOperate = concatBeforeAfterOperator(globalCurrentString);
    let operationResult = operate(arrayToOperate)
    if((operationResult == "NaN") || (operationResult == "Infinity")){
        pasteResultOnMainBox("Not posible!")
        globalCurrentString = [];
    }else{
        pasteResultOnMainBox(operationResult)
        globalCurrentString = operationResult;
    }
}
/*for the C button, deletes the las element of the array and paste the view in the stringbox*/
theCButton.addEventListener("click", e =>{
    try {globalCurrentString = globalCurrentString.slice(0, globalCurrentString.length - 1);} catch (DontWorry) {}   
    holder4 = 0;
    pasteStringOnMainBox();
})

/*For the AC button, changes the array to an empty array*/
theACButton.addEventListener("click", e =>{
    globalCurrentString = [];
    pasteStringOnMainBox();
    theEqualValue.textContent = "0";
})

thePointButton.addEventListener("click", e =>{
    forThePointFunction();
})

/*This function let the user change the number input to an positive or negative value, adding or deleting the "-" sign an the beginning
of the number, for the number before the operator and for the number after the operator*/
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
/******************************* */
/* The support for keyboard keys */
/* Because when you press an specific key, the key must do the same thing what the calculator button does, so
i decided make the logic happens in separate functions for "allNumberButtons", "allOperatorButtons", "theEqualButton" and "thePointButton"*/

const forAllNumberFunction = function(whatIsTheKey){
    holder4 = 0;
    globalCurrentString.push(parseFloat(whatIsTheKey));
    pasteStringOnMainBox();
}

const forAllOperatorsFunction = function(whichOperator){
    let holder = 0;
    ++holder4;
    globalCurrentString.push(whichOperator);

    if(holder4 >= 2){
        globalCurrentString.pop();
        globalCurrentString.pop();
        globalCurrentString.push(whichOperator);
    }
        
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
        globalCurrentString.push(whichOperator);
        pasteStringOnMainBox();
    }
}

const forThePointFunction = function(){
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
}

const forTheEqualFunction = function(){
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
        let lastElement;
        globalCurrentString.forEach(element => {
            lastElement = globalCurrentString[globalCurrentString.length - 1]
        });
        if((lastElement == "+") || (lastElement == "−") || (lastElement == "/") || (lastElement == "x")){
            
        }
        else{
            sus();
            pasteStringOnMainBox();  
        } 
    }
}

window.addEventListener("keydown", e =>{
    whatIsTheKey = e.key;
    
    if((whatIsTheKey == ("0")) || (whatIsTheKey == ("1")) || (whatIsTheKey == ("2")) || (whatIsTheKey == ("3")) || (whatIsTheKey == ("4")) ||
        (whatIsTheKey == ("5")) || (whatIsTheKey == ("6")) || (whatIsTheKey == ("7")) || (whatIsTheKey == ("8")) || (whatIsTheKey == ("9"))){
    
        forAllNumberFunction(whatIsTheKey);
    }else if(whatIsTheKey == ("/")){
        forAllOperatorsFunction(differentOperators[0])
    }else if((whatIsTheKey == ("*")) || (whatIsTheKey == ("x"))){
        forAllOperatorsFunction(differentOperators[1])
    }else if(whatIsTheKey == ("-")){
        forAllOperatorsFunction(differentOperators[2])
    }else if(whatIsTheKey == ("+")){
        forAllOperatorsFunction(differentOperators[3])
    }else if(whatIsTheKey == "Backspace"){
        try {globalCurrentString = globalCurrentString.slice(0, globalCurrentString.length - 1);} catch (DontWorry) {}   
        holder4 = 0;
        pasteStringOnMainBox();
    }else if(whatIsTheKey == "."){
        forThePointFunction();
    }else if(whatIsTheKey == "Enter"){
        forTheEqualFunction();
    }
})

/* :) */
