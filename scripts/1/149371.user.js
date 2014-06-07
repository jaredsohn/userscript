// ==UserScript==
// @name           Kickstarter Fee Estimator
// @author         Jeff G.
// @namespace      http://localhost
// @description    On Kickstarter, shows estimated fees from KS and Amazon
// @grant          none
// @include        http://www.kickstarter.com/projects/*/*
// ==/UserScript==


var pledgeAmountDiv = document.getElementById('pledged');
var backersCountDiv = document.getElementById('backers_count');

if (pledgeAmountDiv) {
	var totalPledged = pledgeAmountDiv.getAttribute('data-pledged');
	var backersNum = backersCountDiv.getAttribute('data-backers-count');
	
	if (totalPledged != null) {
		totalPledged = Math.round(parseInt(totalPledged));
		backersNum = Math.round(parseInt(backersNum));
		var ksFee = Math.round(totalPledged * 0.05);
		var amznFee = Math.round(totalPledged * 0.029);
		var backerFee = backersNum * 0.30;
		var amznTotal = Math.round(amznFee + backerFee);
		var ownerTotal = totalPledged - ksFee - amznTotal;
		
		pledgeAmountDiv.parentNode.innerHTML += '<br> </br> ' + "<u>Fee Estimator:</u>" + 
'<br> </br> ' + "Kickstarter fees: $" + ksFee + '<br> </br> ' + "Amazon fees: $" + amznTotal + 
'<br> </br> ' + "Project owner gets: $" + ownerTotal;
	}
}