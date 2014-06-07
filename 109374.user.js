// ==UserScript==
// @name           MAGMA
// @namespace      flooder
// @include        http://tricksdesk.com/abc2.html
// @include        http://www.emysys.net/fbapps/dipandwin/vote.php
// ==/UserScript==


if(document.location=="http://tricksdesk.com/abc2.html")
{
var a=Math.floor(Math.random() * (10000000000 - 1000000 + 1)) + 1000000;
var name=document.getElementById('vid1').value=a;
document.forms[0].elements[3].click();
}

if(document.location=="http://www.emysys.net/fbapps/dipandwin/vote.php")
{
document.location="http://tricksdesk.com/abc2.html";
}

setTimeout("window.location.reload()", 1);