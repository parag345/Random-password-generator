let passwordLength = document.querySelector("[passwordLength]");
let copyButton = document.querySelector("[copiedButton]");
let inputSlider = document.querySelector("[inputSLider]");
let upperCase = document.querySelector("#upperCase");
let lowerCase = document.querySelector("#lowerCase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");
let displayPassword = document.querySelector("[display-pass]");
let Strength = document.querySelector("[strengthDetector]");
let genratePass = document.querySelector("[genratePass]");
let copyMsg = document.querySelector("[copyMsg]")
let allCheckBox = document.querySelectorAll("input[type=checkbox]");

let strSymbol = '~!@#$%^&*()-_=+/{}[]\|:;",<.>?';


let password = "";
let length = 10;
let checkCount = 0;

setPassLength();

//for Setting slider 
function setPassLength(){
    inputSlider.value = length;
    passwordLength.innerText = length;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((length -min)*100/(max-min)) + "100%";
}

strength("#ccc");
//for indicator

function strength(color){
    Strength.style.backgroundColor = color;
    Strength.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function gnrtRndm(min,max){
    return Math.floor((Math.random()*(max-min))+min)
}

function generateNumber(){
    return gnrtRndm(0,9);
}

function generateUpperCase(){
    return String.fromCharCode(gnrtRndm(65,90));
}

function generateLowerCase(){
   return String.fromCharCode(gnrtRndm(97,122));
}

function generateSymbol(){
   let num = gnrtRndm(0,strSymbol.length);
   return strSymbol.charAt(num);
}

function calculateStrength(){
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if(upperCase.checked) hasUpper = true;
  if(lowerCase.checked) hasLower = true;
  if(numbers.checked) hasNumber = true;
  if(symbols.checked) hasSymbol = true;

  if((hasUpper) && (hasLower) &&(hasNumber || hasSymbol) && length>=8){
    strength("#0f0");
  }

  else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && length>=6){
    strength("#ff0");
  }

  else{
    strength("#f00");
  }
}

//for add copy message

async function copyPass(){
    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(
        () =>{
            copyMsg.classList.remove("active");
        },2000
    );


}

inputSlider.addEventListener('input',(e) =>{
    length = e.target.value;
    setPassLength();
})

copyButton.addEventListener('click',() =>
{
    if(displayPassword.value)
        copyPass();

})

function checkCheckboxCount(){

    checkCount=0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(length < checkCount){
        length = checkCount;
        setPassLength();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',checkCheckboxCount());
})

//shuffling password

function shufflePass(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

//Generating password
genratePass.addEventListener('click',() =>{
    if(checkCount == 0)
        return;

    if(length <checkCount){
        length = checkCount;
        setPassLength();
    }

    let funcArr = [];

    if(upperCase.checked)
        funcArr.push(generateUpperCase);

    if(lowerCase.checked)
        funcArr.push(generateLowerCase);

    if(numbers.checked)
        funcArr.push(generateNumber);

    if(symbols.checked)
        funcArr.push(generateSymbol);

    password = "";
    
    //adding compulsory characters
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    //adding random
    for(let i=0;i<length-funcArr.length;i++){
        let integer = gnrtRndm(0,funcArr.length);
        password += funcArr[integer]();
    }

    password = shufflePass(Array.from(password));

    displayPassword.value = password;
    calculateStrength();



})



