let billInput = document.querySelector('#bill-input-box');

const tipBtn = document.querySelectorAll('.tip-card-box button');
let customTip = document.querySelector('#tip-input');
let peopleInput = document.querySelector('#people-input');
const generateBillBtn = document.querySelector('#submit-btn');

let tipAmount = document.querySelector('#tip-amount span');
let totalAmount = document.querySelector('#total-amount span ');
let dividedBill = document.querySelector('#divided-bill span');
const resetBtn = document.querySelector('#reset');

let billAmount;
billInput.addEventListener('input', (e) => {
  billAmount = +e.target.value;
  let passValue = e.target.value;

  enableBtn(passValue);
});

let tipValue;

let tipUpdate = (tip, el) => {
  enableBillBtn();
  el.classList.add('btnSelect');
  tipValue = tip / 100;

  customTip.value = '';
  customTipValue = '';
};

let customTipValue;

customTip.addEventListener('input', (e) => {
  customTipValue = +e.target.value / 100;

  if (customTipValue < 0) {
    customTipValue = 0;
    customTip.value = 0;
  }

  tipBtn.forEach((btn) => {
    tipValue = '';
    btn.classList.remove('btnSelect');
  });

  enableBillBtn();
});

let totalPeople;

peopleInput.addEventListener('input', (e) => {
  totalPeople = +e.target.value;

  if (totalPeople === 0) {
    totalPeople = 1;
    peopleInput.value = 1;
  }
  enableBillBtn();
});

function enableBtn(passValue) {
  if (passValue === undefined || passValue === '') {
    for (const btn of tipBtn) {
      btn.classList.add('disable');
      btn.setAttribute('disabled', 'true');
    }

    customTip.classList.add('disable');
    customTip.setAttribute('disabled', 'true');
    peopleInput.classList.add('disable');
    peopleInput.setAttribute('disabled', 'true');
    generateBillBtn.classList.add('disable');
    generateBillBtn.setAttribute('disabled');
    customTip.value = '';
    peopleInput.value = '';
  } else {
    for (const btn of tipBtn) {
      btn.classList.remove('disable');
      btn.removeAttribute('disabled');
    }

    customTip.classList.remove('disable');
    customTip.removeAttribute('disabled');

    peopleInput.classList.remove('disable');
    peopleInput.removeAttribute('disabled');
  }
}

function enableBillBtn() {
  if (billAmount) {
    if (customTipValue || tipValue) {
      if (peopleInput.value) {
        generateBillBtn.classList.remove('disable');
        generateBillBtn.removeAttribute('disabled');
      }
    }
  } else {
    generateBillBtn.classList.add('disable');
    generateBillBtn.setAttribute('disabled', 'true');
  }
}

function calculateAmount() {
  const tipRs =
    (tipValue !== undefined && tipValue !== '' ? tipValue : customTipValue) *
    billAmount;
  tipAmount.innerText = '₹' + tipRs;
  let totalAmountValue = billAmount + tipRs;
  totalAmount.innerText = '₹' + totalAmountValue;

  let perPersonBill = totalAmountValue / parseInt(totalPeople);
  dividedBill.innerText = perPersonBill;
}

generateBillBtn.addEventListener('click', () => {
  calculateAmount();
  resetBtn.classList.remove('disable');
  resetBtn.removeAttribute('disabled');
});

function resetAll() {
  billInput.value = '';
  billAmount = '';
  tipBtn.value = '';
  tipValue = '';
  customTip.value = '';
  customTipValue = '';
  peopleInput.value = '';
  totalPeople = '';
  tipAmount.innerText = '';
  totalAmount.innerText = '';
  dividedBill.innerText = '';

  tipBtn.forEach((btn) => {
    btn.classList.add('disable');
    btn.setAttribute('disabled', 'true');
    btn.classList.remove('btnSelect');
  });
  customTip.value = '';
  peopleInput.value = '';

  resetBtn.classList.add('disable');
  resetBtn.setAttribute('disabled', 'true');

  customTip.classList.add('disable');
  customTip.setAttribute('disabled', 'true');
  peopleInput.classList.add('disable');
  peopleInput.setAttribute('disabled', 'true');
  generateBillBtn.classList.add('disable');
  generateBillBtn.setAttribute('disabled', 'true');
}

resetBtn.addEventListener('click', () => {
  resetAll();
});
