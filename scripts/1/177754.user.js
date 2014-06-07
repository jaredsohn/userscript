// ==UserScript==
// @name           Auto Max Soldiers/Tanks/Spies
// @namespace      Valek
// @description    Automatically sets the value in the textbox to the maximum buyable soldiers, tanks, and spies (Cyber Nations).
// @include        http://www.cybernations.net/militarybuysell.asp?Nation_ID=*
// @include        http://www.cybernations.net/tanksbuysell.asp?Nation_ID=*
// @include        http://www.cybernations.net/spies_purchase.asp
// ==/UserScript==

if(window.location.href.indexOf("spies_purchase.asp") != -1)
{
	var spystr = document.getElementsByTagName("i")[0].innerHTML.split(" of ");
	var curspies = spystr[0];
	var maxspies = spystr[1];
	var purchase = maxspies - curspies;
	var spiesbox = document.getElementsByName("amount_purchase")[0];
	spiesbox.value = purchase;
}
else
{
	var maxmil = document.getElementsByTagName("i")[5];
	var trans = document.getElementById("Transaction");
	var purchase = maxmil.innerHTML.replace(",","");
	trans.value = purchase;
}