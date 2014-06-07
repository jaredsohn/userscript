// ==UserScript==
// @name           GMail Title Reorganizer
// @namespace      GTitleReorganizer
// @description    Reorganizes your GMail Title So It Is Easier To See The Number Of Unread Mail In Your Inbox.
// @include        http://mail.google.com/*
// ==/UserScript==

setInterval(retitle,5000)

function retitle()
{
var ttext = document.title;

ttext = ttext.split(" - ");
var newT='';

if(ttext[0].match("Gmail"))
{
for(var c=1;c>-1;c--)
{
newT += ttext[c]+" - ";
}
newT += ttext[2];
document.title=newT;
}else{
return false;
}
}

GM_registerMenuCommand("Organize Title Now!(Temporarily until new mail arrives)",retitle)
