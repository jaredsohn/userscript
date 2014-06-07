// ==UserScript==
// @name           Haggle 30% OFF
// @namespace      D3mitri
// @include        *subeta.net/shop.php*
// ==/UserScript==

// Haggle 30% OFF
if(document.getElementsByTagName('body')[0].innerHTML.indexOf("How much do you want to offer?") != -1) {
	window.addEventListener("load", function(){document.getElementsByName('random')[0].focus();}, false); //Make captcha the default textbox
	var offer = document.getElementsByTagName('body')[0].innerHTML.split("<b>Price</b>: ");
	offer = Math.ceil(offer * .30); //Haggle 30% (rounded up)
	
	document.getElementById("amount").value = offer;
}

//Make all purchases pop up in a new window
for(i in document.getElementsByTagName('form')) {
	if(document.getElementsByTagName('form')[i].action.indexOf("/shop.php?") != -1) {
		document.getElementsByTagName('form')[i].target = "_blank";
	}
}