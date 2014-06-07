// ==UserScript==
// @name           Auto Deploy Soldiers/Tanks
// @namespace      Valek
// @description    Automatically sets the value in the textbox to the maximum deployment (Cyber Nations).
// @include        http://www.cybernations.net/militarydeploy.asp?Nation_ID=*
// ==/UserScript==

if(window.location.href.indexOf("spies_purchase.asp") != -1)
{
	var spystr = document.getElementsByTagName("i")[0].innerHTML.split(" of ");
	var curspies = spystr[0];
	var maxspies = spystr[1];
	var purchase = maxspies - curspies;
	var spiesbox = document.getElementsByName("Military_Deployed")[0];
	spiesbox.value = purchase;
}
else
{
	var maxmil = document.getElementsByTagName("i")[5];
	var trans = document.getElementById("Deployment");
	var purchase = maxmil.innerHTML.replace(",","");
	trans.value = purchase;
}