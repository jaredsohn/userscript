// ==UserScript==
// @name           Strat-O-Matic Waiver claims
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/*trade/waivers_your_claims.html*
// @include        http://fantasygames.sportingnews.com/stratomatic/*trade/waivers_your_claims.html*
// ==/UserScript==

var mySalary, mycurrentFunds, add = 0, drop = 0, mytotalInsert, colElement, x, nStr, x1, x2;

var salary = document.evaluate("//td[@class='tright'][contains(text(),',')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
for (var i = 0; i < salary.snapshotLength; i++) {
mySalary = salary.snapshotItem(i);

	if ( ( i % 2 ) == 0 ) {
    		//even
		mySalary = mySalary.nodeValue.replace(/,/g,'');
		add = add + parseInt(mySalary);
		
  	}
	else {
		//odd
		mySalary = mySalary.nodeValue.replace(/,/g,'');
		drop = drop + parseInt(mySalary);
	}
	
}

var currentFunds = document.evaluate("//text()[contains(string(),'$')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

mycurrentFunds = currentFunds.snapshotItem(0);
mycurrentFunds = mycurrentFunds.nodeValue.replace(/,/g,'');
mycurrentFunds = mycurrentFunds.replace('$','');

var fundsafterWaivers = (parseInt(mycurrentFunds) + parseInt(drop)) - parseInt(add);
fundsafterWaivers = String(fundsafterWaivers);

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';

	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var totalInsert = document.evaluate("//td/b[contains(text(),'Current funds:')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < totalInsert.snapshotLength; i++) {
	mytotalInsert = totalInsert.snapshotItem(i);
	colElement = document.createElement("div");
	colElement.innerHTML = '<b>After waivers: </b>'+ '$' + addCommas(fundsafterWaivers);
}
mytotalInsert.parentNode.appendChild(colElement,mytotalInsert);
