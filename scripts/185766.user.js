// ==UserScript==
// @name       STACKSONSTACKS
// @version    0.1
// @description  get stacks on stacks just like our favorite forum member Razor!
// @match      https://payments.amazon.com/withdraw
// @match      https://www.mturk.com/mturk/youraccount
// @copyright  2012+, You
// ==/UserScript==

if (document.getElementById("balanceValue"))
    document.getElementById("balanceValue").innerHTML = "$1,000,000.00";
if (document.getElementById("account_balance"))
	document.getElementById("account_balance").innerHTML = "$1,000,000.00";
document.onkeydown = showkeycode;
var array = ["Suck it Razor","This ain't even hard","#stacksonstacks","ponies4lyfe","$1,000,000.00"];
var questionSelector = -1;
             

function showkeycode(evt){
        var keycode = evt.keyCode;
        console.log(keycode);
        switch (keycode) {
            case 78: //n
                questionSelector++;
                if (questionSelector > 4)
                    questionSelector=0;
                if (document.getElementById("balanceValue"))
                    document.getElementById("balanceValue").innerHTML = array[questionSelector];
                if (document.getElementById("account_balance"))
	                document.getElementById("account_balance").innerHTML = array[questionSelector];
                break;
            default: break;
        }
}