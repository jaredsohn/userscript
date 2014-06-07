// ==UserScript==
// @name           WK Bash Adviser
// @namespace      Ranatama
// @description    Based on average damage per day and HP left, shows which WK have a low(er) chance of dying.
// @include        http://*animecubed.com/billy/bvs/worldkaiju.html
// ==/UserScript==


//Stop changing that page dangit

function getDays(hitp, days){
//returns how many days ahead or behind a WK is
	var difference = hitp - 71500000*days;
	var daydiff = Math.floor(difference/71500000);
	
	if (Math.abs(difference) < 71500000){
		if(difference < 0){
			return "\<1 Day Behind";
		}
		return "\<1 Day Ahead";
	}	
	if (daydiff >= 0){
		return "+" + daydiff.toString() + " Days";
	} else {
		return daydiff.toString() + " Days";
	} 
}


var nameElements = document.evaluate("//label/span/font/b/font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


var hpElements = document.evaluate("//tbody/tr/td[3]/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 
var daysElements = document.evaluate("//div//tr[position() > 1]/td[5]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var numWK = nameElements.snapshotLength;
var hpParsed = [];
var daysParsed = [];
for (var i = 0; i < numWK; i++){
	var hpTempElem = hpElements.snapshotItem(i);
	var hpTemp = hpTempElem.innerHTML;
	if(hpTemp.indexOf("Private") > -1 || hpTemp.indexOf("Defeat") > -1){ 
// special HP cases
		hpParsed[i] == 0;
	}else {
		hpParsed[i] = parseInt(hpTemp.replace(/,/g,""));
	}
	var days = daysElements.snapshotItem(i);
	if(days.innerHTML == "<b>LAST<br>DAY</b>"){
		daysParsed[i] = 1;
	} else {
	daysParsed[i] = parseInt(days.innerHTML);
	}

}


for (var j = 0; j < numWK; j++){
//You need an average of 71.5 million damage a day
// if hpLeft is greater than hpShouldBeLeft...
	if(hpParsed[j] > 0){
	if( hpParsed[j] > 1000000000 - 71000000*(14 - daysParsed[j])){

		var doomed = nameElements.snapshotItem(j);

		if(daysParsed[j] == 1){
			doomed.setAttribute('style', 'color: 000000; font-size: 12px');
			doomed.innerHTML += " " + getDays(999999999 - hpParsed[j], 14 - daysParsed[j]);
		}else{
			doomed.setAttribute('style', 'color: FF4500; font-size: 12px');
		doomed.innerHTML += " " + getDays(999999999 - hpParsed[j], 14 - daysParsed[j]);
	}

		

	} else if ( hpParsed[j] < 1000000000 - 90000000*(14 - daysParsed[j])){
		var good = nameElements.snapshotItem(j);
		good.setAttribute('style', 'color: 00FF00; font-size: 12px');
		good.innerHTML += " " + getDays(999999999 - hpParsed[j], 14 - daysParsed[j]);
	} else {
		var meh = nameElements.snapshotItem(j);
		meh.setAttribute('style', 'color: 00CED1; font-size: 12px');
		meh.innerHTML += " " + getDays(999999999 - hpParsed[j], 14 - daysParsed[j]);
	}
	}

}










