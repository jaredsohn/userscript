// ==UserScript==
// @name           WK Damage Checker
// @namespace      Ranatama
// @description    Adds up the percentage bonuses you currently have, allows for easy checking.
// @include        http://*animecubed.com/billy/bvs/worldkaiju-fight.html
// ==/UserScript==

//Damage Bonuses start at the 5th <i> tag

var damageElements = document.evaluate("//i", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var damageBonuses = 0;
for ( var j=0 ; j < damageElements.snapshotLength; j++ )  
{  
	var numberElements = damageElements.snapshotItem(j).textContent;

	var regex1 = new RegExp("\\+\\d*%!","i"); 

	if (regex1.exec(numberElements)){
		var percentage = regex1.exec(numberElements)[0];
		var regex2 = new RegExp("\\d{1,3}","i");
		damageBonuses += parseInt(regex2.exec(percentage));
	}
}  
//I hate XPath, I hate RegExp. But they make life so much easier...
var textfieldParent = document.evaluate("//center//table//tr//td/b[6]/font", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var breakelement = document.createElement('br');
var displayResult = document.createElement('font');
displayResult.setAttribute('style','font-size:23px');
displayResult.setAttribute('color','#444400');
displayResult.innerHTML = "Total: " + damageBonuses + "%";

textfieldParent.appendChild(breakelement);
textfieldParent.appendChild(displayResult);
textfieldParent.appendChild(breakelement);

