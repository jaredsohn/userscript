// ==UserScript==
// @name           Kickstarter Add Percentage
// @author         Didero
// @namespace      http://userscripts.org/users/didero
// @description    On Kickstarter, displays the percentage of the goal reached, and the difference between the pledged and asked amount
// @include        http://www.kickstarter.com/projects/*/*
// @include        https://www.kickstarter.com/projects/*/*
// @version        3.2.1
// @downloadURL    https://userscripts.org/scripts/source/128478.user.js
// @updateURL      https://userscripts.org/scripts/source/128478.meta.js
// @grant          none
// ==/UserScript==

function addThousandsSeparator(number) {
	if (number < 1000) return number.toString();
	//													 reverse the String			find groups of 3 numbers  add commas    reverse the string again
	else return number.toString().split('').reverse().join('').match(/\d{1,3}/g).join(',').split('').reverse().join('');
}

var pledgeAmountDiv = document.getElementById('pledged');
if (pledgeAmountDiv) {
	var percentageRaised = pledgeAmountDiv.getAttribute('data-percent-raised');
	if (percentageRaised != null) {
		percentageRaised = Math.round(parseFloat(percentageRaised) * 100);
		var pledgeDifference = Math.round(parseFloat(pledgeAmountDiv.getAttribute('data-goal')) - parseFloat(pledgeAmountDiv.getAttribute('data-pledged')));
		
		//Make sure we display the same currency symbol as on the rest of the page
		var currencySymbol = '$';
		if (pledgeAmountDiv.innerHTML.indexOf('£') > -1) currencySymbol = '£';
		
		var leftOrOverTarget = 'to';
		//If the target has already been reached, display how much more money has been promised
		if (pledgeDifference < 0) {
			leftOrOverTarget = 'over';
			pledgeDifference = Math.abs(pledgeDifference);
		}		
		pledgeDifference = addThousandsSeparator(pledgeDifference);
		
		//Display the percentage
		var percentageDisplay = document.createElement('span');
		percentageDisplay.innerHTML = ' ('+percentageRaised+'% )';
		pledgeAmountDiv.parentNode.appendChild(percentageDisplay);
		
		//Display the stats in a separate line, for more room. Nest it just like the other numbers, so it gets formatted properly
		var moneyDisplay = document.createElement('h5');
		moneyDisplay.innerHTML = '<div><span>' + currencySymbol + pledgeDifference + ' ' + leftOrOverTarget + ' target</span></div>';
		pledgeAmountDiv.parentNode.parentNode.insertBefore(moneyDisplay, pledgeAmountDiv.parentNode.nextSibling);
	}
}