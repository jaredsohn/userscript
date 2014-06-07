// ==UserScript==
// @name          Windows Live Mail AD Hider
// @namespace     http://by117w.bay117.mail.live.com/
// @description   Hides AD'S on top
// @include       http://*.mail.live.com/* 
// ==/UserScript==

for (i=0; i < document.getElementsByTagName("iframe").length; i++) 
{
    document.getElementsByTagName("iframe")[i].style.display='none';
}
