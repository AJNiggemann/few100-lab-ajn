import './styles.css';

//Initialization of Value
let enteredBillAmountElmnt: HTMLInputElement = <HTMLInputElement>document.getElementById('bill_amount');
let errorSectionElmnt: HTMLInputElement = document.querySelector('.errorDisplay');
let tippercentElmnt: HTMLDivElement = document.querySelector('.pickedPercent');
let billamtElmnt: HTMLLIElement = document.querySelector('.billAmt');
let disptipElmnt: HTMLLIElement = document.querySelector('.percentPicked');
let tipamtElmnt: HTMLLIElement = document.querySelector('.tipAmt');
let totalbillElmnt: HTMLLIElement = document.querySelector('.billTotal');
let errorBorderElmnt = document.getElementById('bill_amount');
let tipSelectedBtn = document.querySelectorAll('.btn');
let selectedTipAmtVal: number = 0;
let tipPercentVal: number = 0;
let billAmountVal: number = 0;
let tipAmountVal: number = 0;
let totalBillVal: number = 0;
//
//Initial Functionality
tipSelectedBtn.forEach(ts => ts.classList.add('disabled'));
enteredBillAmountElmnt.addEventListener('keyup', validateCost);
//

function validateCost() {
    billAmountVal = parseFloat(enteredBillAmountElmnt.value);
    if (isNaN(billAmountVal)) {
        errorSectionElmnt.innerHTML = 'Invalid, please re-enter the amount of the bill...';
        errorBorderElmnt = document.getElementById('bill_amount');
        errorBorderElmnt.classList.add('error-input-border');
        clearValues();
    } else if (billAmountVal <= 0) {
        errorSectionElmnt.innerHTML = "";
        tipSelectedBtn.forEach(ts => ts.classList.remove('disabled'));
        tipSelectedBtn.forEach(ts => ts.addEventListener('click', processClick));
    } else if (billAmountVal > 0) {
        errorSectionElmnt.innerHTML = "";
        if (selectedTipAmtVal > 0) {
            errorBorderElmnt = document.getElementById('bill_amount');
            errorBorderElmnt.classList.remove('error-input-border');
            calculateTip(selectedTipAmtVal);
        } else {
            errorBorderElmnt = document.getElementById('bill_amount');
            errorBorderElmnt.classList.remove('error-input-border');
            tipSelectedBtn.forEach(ts => ts.classList.remove('disabled'));
            tipSelectedBtn.forEach(ts => ts.addEventListener('click', processClick));
        }
    }
}
function processClick() {
    let button = this as HTMLButtonElement;
    errorBorderElmnt.classList.remove('error-input-border');
    tipSelectedBtn.forEach(ts => ts.classList.remove('disabled'));
    button.classList.add('disabled');
    if (button.id === 'percent_10') {
        if (billAmountVal <= 0) {
            zeroBill();
        } else {
            selectedTipAmtVal = 10;
            calculateTip(selectedTipAmtVal);
        }
    } else if (button.id === 'percent_15') {
        if (billAmountVal <= 0) {
            zeroBill();
        } else {
            selectedTipAmtVal = 15;
            calculateTip(selectedTipAmtVal);
        }
    } else {
        if (billAmountVal <= 0) {
            zeroBill();
        } else {
            selectedTipAmtVal = 20;
            calculateTip(selectedTipAmtVal);
        }
    }
}
function zeroBill() {
    errorSectionElmnt.innerHTML = 'Bill needs to be more than zero, please re-enter...';
    errorBorderElmnt = document.getElementById('bill_amount');
    errorBorderElmnt.classList.add('error-input-border');
    clearValues();
}
function calculateTip(ta: number) {
    tipPercentVal = ta / 100;
    billAmountVal = parseFloat(enteredBillAmountElmnt.value);
    tipAmountVal = billAmountVal * tipPercentVal;
    totalBillVal = billAmountVal + tipAmountVal;
    displayValues();
}
function displayValues() {
    tippercentElmnt.innerHTML = `You are tipping ${selectedTipAmtVal}%`;
    billamtElmnt.innerHTML = `Bill Amount $${billAmountVal.toFixed(2)}`;
    disptipElmnt.innerHTML = `Tip Percentage: ${selectedTipAmtVal}%`;
    tipamtElmnt.innerHTML = `Amount of tip: $${tipAmountVal.toFixed(2)}`;
    totalbillElmnt.innerHTML = `Total to be Paid: $${totalBillVal.toFixed(2)}`;
}
function clearValues() {
    tipSelectedBtn.forEach(ts => ts.classList.add('disabled'));
    enteredBillAmountElmnt.value = "";
    selectedTipAmtVal = 0;
    tippercentElmnt.innerHTML = ``;
    billamtElmnt.innerHTML = `Bill Amount $`;
    disptipElmnt.innerHTML = `Tip Percentage: %`;
    tipamtElmnt.innerHTML = `Amount of tip: $`;
    totalbillElmnt.innerHTML = `Total to be Paid: $`;
}