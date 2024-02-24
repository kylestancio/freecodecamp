let price = 19.5;
let cid = [
  ["PENNY", 0.5], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 0], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]
];

const userCashInput = document.getElementById("cash");
const resultDiv = document.getElementById("change-due");
const cidDisplay = document.getElementById("cid-container");
const priceDisplay = document.getElementById("price");
const listParent = document.createElement("ul");


class Transaction {
  price;
  cash;
  change;
  statusText = "Status: ";

  constructor(price, cash){
    this.price = parseFloat(price);
    this.cash = parseFloat(cash);
    this.change = this.cash - this.price;
  }

  isChangeRequired(){
    if (this.price > this.cash) {
      alert("Customer does not have enough money to purchase the item");
      return false;
    }
    return true;
  }

  calculateChangeDenomination(){
    let text = "";
    let remaining = this.change;

    cid.reverse().forEach((e, i)=>{
      let currentCash = 0;
      
      if (e[0] === "ONE HUNDRED") currentCash = 100;
      if (e[0] === "TWENTY") currentCash = 20;
      if (e[0] === "TEN") currentCash = 10;
      if (e[0] === "FIVE") currentCash = 5;
      if (e[0] === "ONE") currentCash = 1;
      if (e[0] === "QUARTER") currentCash = 0.25;
      if (e[0] === "DIME") currentCash = 0.1;
      if (e[0] === "NICKEL") currentCash = 0.05;
      if (e[0] === "PENNY") currentCash = 0.01;

      if (remaining >= currentCash && e[1] > 0){
        if (remaining >= e[1]){
          text = text + `${e[0]}: \$${e[1]} `;
          remaining = (remaining - e[1]).toFixed(2);
          e[1] = 0;
        }else{
          let filler = Math.floor(remaining/currentCash) * currentCash;
          if ( filler !== 0){
            text = text + `${e[0]}: \$${Math.floor(remaining/currentCash) * currentCash} `;
            remaining = (remaining - (Math.floor(remaining/currentCash) * currentCash)).toFixed(2);
            e[1] = e[1] - filler;
          }
        }
      }
    });

    // REVERT ARRAY ARRANGEMENT BACK TO INITIAL STATE
    cid.reverse();

    if (remaining > 0){
      return "INSUFFICIENT_FUNDS";
    }
    return `${cid.reduce((sum, item)=>sum+item[1], 0) > 0 ? "OPEN " : "CLOSED "} ${text}`;
  }

  getStatus(){
    if (this.change === 0) return "No change due - customer paid with exact cash"
    return this.statusText + this.calculateChangeDenomination();
  }
}

function handlePurchase() {
  resultDiv.innerHTML = "";
  const transaction = new Transaction(price, userCashInput.value);
  if (!transaction.isChangeRequired()) return;
  resultDiv.innerHTML = transaction.getStatus();
  displayCashInDrawer();
}

function displayCashInDrawer(){
  
  listParent.innerHTML = null;
  cid.forEach(item => {
    const listItem = document.createElement("li");

    listItem.style.margin = "0 0 1rem 0";
    listItem.innerHTML = `${item[0]}: \$${item[1].toFixed(2)}`
    listParent.appendChild(listItem)
  })
  cidDisplay.appendChild(listParent);
}

// INITIALIZE CASH IN DRAWER DISPLAY
displayCashInDrawer();

// INITIALIZE PRICE DISPLAY
priceDisplay.innerHTML = `\$${price.toFixed(2)}`

userCashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){
    handlePurchase()
  }
})