// ==UserScript==
// @name       Mint True Costs
// @version    0.2
// @description  Shows the true cost of mint transactions
// @match      https://wwws.mint.com/transaction.event*
// ==/UserScript==


////////////////////////////////////////////////////////////////////////////////
// BEGIN USER PREFERENCES
//Rate of return
var r = 0.07;
//Number of years down the line * Math.exp(r*t)
var t = 30;
var multiplier = Math.pow(1+r,t);

function clean_money(dollars)
{
    return dollars.replace("$","").replace("–","").replace(",","");
}


function _get_compound_interest(p){
    return (p * multiplier).toFixed(2);
}

function set_true_costs(target){
    var dollars = target.innerHTML;
    var future_value = _get_compound_interest(clean_money(dollars));
    if( future_value > 0 ){
        target.innerHTML = dollars + " ( "+ future_value +" )";
    }
}

function update_moneys() {
    var moneys = document.getElementById('transaction-list-body').getElementsByClassName("money");
    for (var i=0; i<moneys.length; i++) {
            set_true_costs(moneys[i]);

    }
}

document.addEventListener('DOMNodeInserted',update_moneys);

