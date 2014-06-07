// ==UserScript==
// @name           Highlands Union Bank Transfer Fix
// @namespace      www.hubank.com
// @include        https://www.hubank.com/CLKPCB/051404914/Site/TransfersPayments/transfer-funds2-m.asp
// ==/UserScript==

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function embedFunctions() {
	var s = "function DisableButtons() { var backButton = document.getElementsByName('Back'); backButton[0].setAttribute('disabled', 'disabled'); var cancelButton =  document.getElementsByName('Cancel'); cancelButton[0].setAttribute('disabled', 'disabled'); InitStoreFwd();}";
	embedFunction(s);
}
embedFunctions();