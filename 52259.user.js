// ==UserScript==
// @name           Fyll ut nummer hos skandiabanken
// @namespace      http://www.skeib.com
// @include        https://secure.skandiabanken.no/SkbSecure/Authentication/BankID/Mobile.aspx
// ==/UserScript==

function letsFill() {
    
    var mobnr = document.getElementById("ctl00_MainContentPlaceHolder_BoxDefault_txtMobilePhone");
	var birth = document.getElementById("ctl00_MainContentPlaceHolder_BoxDefault_txtMobilePhoneAlias");
	
	mobnr.value = "00000000";
	birth.value = "000000";
	
}


window.onload = letsFill();
