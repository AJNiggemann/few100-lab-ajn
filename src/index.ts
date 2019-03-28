import './styles.css';

//Initialization of Value
let enteredBillAmountElmnt: HTMLInputElement = <HTMLInputElement>document.getElementById('bill_amount');
let errorSectionElmnt: HTMLInputElement = document.querySelector('.errorDisplay');
let tippercent: HTMLDivElement = document.querySelector('.pickedPercent');
let billamt: HTMLLIElement = document.querySelector('.billAmt');
let disptip: HTMLLIElement = document.querySelector('.percentPicked');
let tipamt: HTMLLIElement = document.querySelector('.tipAmt');
let totalbill: HTMLLIElement = document.querySelector('.billTotal');
let errorBorderElmnt = document.getElementById('bill_amount');
let tipSelectedBtn = document.querySelectorAll('.btn');
let selectedTipAmtVal: number = 0;
let tipPercent: number = 0;
let billAmountVal: number = 0;
let tipAmount: number = 0;
let totalBill: number = 0;
//
tipSelectedBtn.forEach(ts => ts.classList.add('disabled'));
enteredBillAmountElmnt.addEventListener('keyup', validateCost);

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
    tipPercent = ta / 100;
    billAmountVal = parseFloat(enteredBillAmountElmnt.value);
    tipAmount = billAmountVal * tipPercent;
    totalBill = billAmountVal + tipAmount;
    displayValues();
}
function displayValues() {
    tippercent.innerHTML = `You are tipping ${selectedTipAmtVal}%`;
    billamt.innerHTML = `Bill Amount $${billAmountVal.toFixed(2)}`;
    disptip.innerHTML = `Tip Percentage: ${selectedTipAmtVal}%`;
    tipamt.innerHTML = `Amount of tip: $${tipAmount.toFixed(2)}`;
    totalbill.innerHTML = `Total to be Paid: $${totalBill.toFixed(2)}`;
}
function clearValues() {
    enteredBillAmountElmnt.value = "";
    selectedTipAmtVal = 0;
    tipSelectedBtn.forEach(ts => ts.classList.add('disabled'));
    tippercent.innerHTML = `You are tipping `;
    billamt.innerHTML = `Bill Amount $`;
    disptip.innerHTML = `Tip Percentage: %`;
    tipamt.innerHTML = `Amount of tip: $`;
    totalbill.innerHTML = `Total to be Paid: $`;
}