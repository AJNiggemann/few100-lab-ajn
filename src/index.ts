import './styles.css';

const tipSelected = document.querySelectorAll('.btn');
tipSelected.forEach(ts => ts.addEventListener('click', processClick));

let selectedTipAmt: number = 0;
const enteredBillAmount: HTMLInputElement = <HTMLInputElement>document.getElementById('bill_amount');
const answers = document.getElementById("values");

function processClick() {
    const div = this as HTMLDivElement;
    if (div.id === 'percent_10') {
        selectedTipAmt = .10
    } else if (div.id === 'percent_15') {
        selectedTipAmt = .15
    } else {
        selectedTipAmt = .20
    }
    calculateTip(selectedTipAmt);
}
function calculateTip(ta: number) {
    const billAmount = parseFloat(enteredBillAmount.value);
    const tipAmount = billAmount * ta;
    const totalBill = billAmount + tipAmount;
    console.log(billAmount);
    console.log(tipAmount);
    console.log(totalBill);
}