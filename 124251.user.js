// ==UserScript==
// @name          Seamless Budget Filter - Corporate Only
//
// @namespace     http://not_here
//
// @description   Changes the look of menu items that fall out of your budget.  
//                Modify the parameters section
//                of the script to customize to where you're at.  By
//                default it's NYC, $15 budget + tax + $1.50.  Adjust your 
//                budget or number of people by clicking on $ or # in the
//                order subtotal box on the top right.
//                
//                2012-02-22
//                Now after 6pm it switches over to a dinner budget.
//
//                Only works on Seamless for Corporate.
//
// @include       https://www.seamless.com/UpdateMemberMealsStep2*
// @include       https://www.seamless.com/UpdateGroupOrder*
// ==/UserScript==

// Parameters
// 
// Adjust these to your preferences or needs
//
var lunchBudget     = 15.0;      // lunch budget
var dinnerBudget    = 20.0;      // dinner budget
var corporateTip    = 1.50       // corporate tip
var taxRate         = 1.08875;   // 8.875 NYC sales tax
var disableColor    = '#FFCCCC'; // RRGGBB
var enableColor     = '#FFFFFF'; // RRGGBB

// State
var budgetPerPerson = 3.84;     // Our budget (default $15 + nyc tax + 1.50 delivery)
var numberOfPeople  = 1;         // Our people (default 1)
if (new Date().getHours() >= 18) {
  budgetPerPerson = dinnerBudget * taxRate + corporateTip;
}
else {
  budgetPerPerson = lunchBudget * taxRate + corporateTip;
}
budgetPerPerson = Math.ceil(budgetPerPerson * 100.0) / 100.0;
var budget = budgetPerPerson;
  

// Function redraws background color based off of remaining funds and price
function RefreshMenu() {
  var subtotalElement = document.getElementById('OrderSubtotalPrice');
  var subtotal = parseFloat(subtotalElement.innerHTML.replace('$',''));
  var remaining = budget - subtotal;

  var priceElements = document.getElementsByClassName('price');
  for (i=0; i<priceElements.length; i++) {
    var price = parseFloat(priceElements[i].innerHTML.replace('$',''));
    price = price * taxRate;
    if (price > remaining) {
      var siblings = priceElements[i].parentElement.children;
      for (j=0; j < siblings.length; j++) {
        siblings[j].style.backgroundColor = disableColor;
      }
    } 
    else {
      var siblings = priceElements[i].parentElement.children;
      for (j=0; j < siblings.length; j++) {
        siblings[j].style.backgroundColor = enableColor;
      }
    }
  }
}
// Attach listener to order total changes
document.getElementById('OrderTotals').addEventListener('DOMSubtreeModified', RefreshMenu);

// Popup that asks for number of people in the order.  We multiply
// the budget by the number of people and refresh fields on the screen
function AdjustBudget() {
  // Save previous value
  var oldbudget = budget;

  // Prompt user, piggyback on jquery/javascript
  var newbudget = prompt("Enter new budget", budgetPerPerson.toFixed(2));
  if (newbudget != null && newbudget != "") {
    budgetPerPerson = parseFloat(newbudget);
    budget = numberOfPeople * budgetPerPerson;
  }

  // Only redraw if the budget changed
  if (budget != oldbudget) {
    RefreshMenu();
    alert("Budget adjusted to " + budget.toFixed(2));
    document.getElementById('budgetValue').textContent = '$' + budget.toFixed(2);  
  }
}

// Popup that asks for number of people in the order.  We multiply
// the budget by the number of people and refresh fields on the screen
function AdjustPeople() {
  // Save previous value
  var oldbudget = budget;

  // Prompt user, piggyback on jquery/javascript
  var people = prompt("Enter number of people", "1");
  if (people != null && people != "") {
    numberOfPeople = parseInt(people);
    budget = numberOfPeople * budgetPerPerson;
  }

  // Only redraw if the budget changed
  if (budget != oldbudget) {
    RefreshMenu();
    alert("Budget adjusted to " + budget.toFixed(2));
    document.getElementById('budgetValue').textContent = '$' + budget.toFixed(2);  
  }
}

// Adds a budget row and a clickable link on top right under
// "My Current Order"
function AddBudgetRow() {
  var budgetLabelElement = document.createElement('td');
  budgetLabelElement.innerHTML = 'Budget (adjust <a id="adjustBudget">$</a> <a id="adjustPeople">#</a>)';
  budgetLabelElement.classList.add('main');

  var budgetValueElement = document.createElement('td'); 
  budgetValueElement.textContent = '$' + budget.toFixed(2);
  budgetValueElement.id = 'budgetValue';

  var budgetRowElement = document.createElement('tr');
  budgetRowElement.appendChild(budgetLabelElement);
  budgetRowElement.appendChild(budgetValueElement);

  var orderTotalsTable = document.getElementById('MyCurrentOrder').getElementsByTagName('tbody')[0];
  var firstRow = orderTotalsTable.children[orderTotalsTable.childElementCount - 1];
  orderTotalsTable.insertBefore(budgetRowElement, firstRow);
}
// Attach listener to your name on the top right.  Click to launch.
AddBudgetRow();
document.getElementById('adjustPeople').addEventListener('click', AdjustPeople);
document.getElementById('adjustBudget').addEventListener('click', AdjustBudget);

// Initial run
RefreshMenu();



