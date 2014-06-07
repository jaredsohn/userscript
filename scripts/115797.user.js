// ==UserScript==
// @name           ultoo
// @description  send contest sms
// @include        http://ultoo.com/home.php
// @include        http://ultoo.com/msgSent.php
// ==/UserScript==


function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


var rnum=Math.floor(Math.random()*11);
var code=randomString(rnum);
if(document.location=="http://ultoo.com/home.php")
{
document.getElementById('MobileNos').value=9988222355;

document.getElementById('Message').value=code;

void(0);
document.forms[0].elements[3].click();
}

if(document.location=="http://ultoo.com/msgSent.php")
{
setTimeout('document.location="http://ultoo.com/home.php"',2000);
}