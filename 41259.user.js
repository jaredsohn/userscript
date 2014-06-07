// ==UserScript==
// @name           MultiBank
// @namespace      http://emsi.it.pl/
// @description    Powoduje, ze FireFox zapamietuje Numer Klienta
// @include        https://moj.multibank.pl/
// @include        https://moj.multibank.pl/login.asp
// ==/UserScript==

var textinput = document.getElementsByName('txtCust');

var txtCust = document.createElement("pre");
txtCust.innerHTML = '<input type="text" autocomplete="on" size="20" maxlength="16" name="txtCust" class="white" onkeypress="checkKey(event)"/>';



if (textinput.length) {
	textinput[0].parentNode.replaceChild(txtCust, textinput[0]);
} else {
	alert('GreaseMonkey ERROR: Brak elementu txtCust!');
}


