// ==UserScript==
// @name           MobWars Desired Cash
// @namespace      http://userscripts.org/users/73540
// @description    On the "Bank" page of the Facebook application Mob Wars, this script adds a "Desired Cash Total" text field to the page. Enter the amount of cash you wish to be holding after your next withdrawal. The appropriate number will be entered in the "Withdrawal Amount" text field. 
// @source         http://userscripts.org/scripts/show/37675
// @identifier     http://userscripts.org/scripts/source/37675.user.js
// @version        1.3
// @date           2008-12-31
// @creator        Joe Sondow
// @include        http://apps.facebook.com/mobwars/bank/
// ==/UserScript==

// On the "Bank" page of the Facebook application Mob Wars, this script adds a 
// "Desired Cash Total" text field to the page. Enter the amount of cash you wish to be
// holding after your next withdrawal. The appropriate number will be entered in the 
// "Withdrawal Amount" text field.
//
// This does not help the player in any way except as a convenience for calculating how
// much money the player would like to withdraw from the bank.
//
// Revision notes
// 1.0 (2008-11-27): Initial version
// 1.1 (2008-11-28): Fixed code for finding bank <div> element, now that HTML has changed.
// 1.2 (2008-11-29): No longer adds any objects to global (window) scope. Also shorter and easier to read.
// 1.3 (2008-12-31): Shorter, simpler number checking.

(function() {
var currentCash = document.forms[2].elements.namedItem('deposit_amount').value;
var withdrawInput = document.forms[1].elements.namedItem('withdraw_amount');

var keyUpHandler = function() {
    var i, isDigit;
    var desiredValue = this.value;
    if (!isNaN(desiredValue)) {
        withdrawInput.value = Math.max(0, desiredValue - currentCash);
    }
};

var input = document.createElement('input');
input.setAttribute('type', 'text');
input.style.marginBottom = '2px';
input.addEventListener('keyup', keyUpHandler, true);

var label = document.createElement('label');
label.innerHTML = 'Desired Cash Total: ';
label.style.marginLeft = input.style.marginBottom;
label.style.marginBottom = input.style.marginBottom;
label.style.fontWeight = 'normal';
label.style.color = 'white';

var bankDiv = document.getElementById('app8743457343_content');
bankDiv.appendChild(label);
bankDiv.appendChild(input);
})();
