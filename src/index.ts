import './styles.css';

const tipSelected = document.querySelectorAll('.btn');
const enteredBillAmount: HTMLInputElement = document.querySelector('.form-control');

let selectedTipAmt: number = 0;

tipSelected.forEach(ts => ts.addEventListener('click', processClick));
enteredBillAmount.addEventListener('keyup', validateCost);

function processClick() {
    const button = this as HTMLButtonElement;
    tipSelected.forEach(ts => ts.classList.remove('disabled'));
    button.classList.add('disabled');
    if (button.id === 'percent_10') {
        selectedTipAmt = 10
    } else if (button.id === 'percent_15') {
        selectedTipAmt = 15
    } else {
        selectedTipAmt = 20
    }
    calculateTip(selectedTipAmt);
}
function calculateTip(ta: number) {
    let tipPercent: number = ta / 100;
    let billAmount: number = parseFloat(enteredBillAmount.value);
    let tipAmount: number = billAmount * tipPercent;
    let totalBill: number = billAmount + tipAmount;
    // console.log(billAmount);
    // console.log(tipAmount);
    // console.log(totalBill);
    displayValues(billAmount, tipAmount, totalBill, ta);
}
function displayValues(ba: number, ta: number, tb: number, tp: number) {
    let tippercent: HTMLDivElement = document.querySelector('.pickedPercent');
    tippercent.innerHTML = `You are tipping ${tp}%`;
    let billamt: HTMLLIElement = document.querySelector('.billAmt');
    billamt.innerHTML = `Bill Amount $${ba.toFixed(2)}`;
    let disptip: HTMLLIElement = document.querySelector('.percentPicked');
    disptip.innerHTML = `Tip Percentage: ${tp}%`;
    let tipamt: HTMLLIElement = document.querySelector('.tipAmt');
    tipamt.innerHTML = `Amount of tip: $${ta.toFixed(2)}`;
    let totalbill: HTMLLIElement = document.querySelector('.billTotal');
    totalbill.innerHTML = `Total to be Paid: $${tb.toFixed(2)}`;
}
function validateCost() {
    let billAmount = parseFloat(enteredBillAmount.value);
    let errorSection: HTMLInputElement = document.querySelector('.errorDisplay');
    let formBorder: HTMLFormElement = document.querySelector('.sr-only');
    if (isNaN(billAmount)) {
        errorSection.innerHTML = 'Invalid, please re-enter the amount of the bill...';
        formBorder.classList.add('needs-validation');
    } else if (billAmount <= 0) {
        errorSection.innerHTML = 'Bill needs to be more than zero, please re-enter...';
        formBorder.classList.add('needs-validation');
    } else if (billAmount > 0) {
        errorSection.innerHTML = "";
        formBorder.classList.remove('needs-validation');
    }
}