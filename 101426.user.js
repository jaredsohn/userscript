
// ==UserScript==
// @name           Fldr like ear
// @namespace      Arc mouse like fldr
// @description    arc vala
// @include        http://lilliurl.co.cc/chat/app.htm
// @include        http://206.183.108.169/voteuser.php
// ==/UserScript==

if(document.location=="http://lilliurl.co.cc/chat/app.htm"){
var a=Math.floor(Math.random() * (10000000000 - 1000000 + 1)) + 1000000;
var name=document.getElementById('vid').value=a;
document.forms[0].elements[3].click();
}


if(document.location=="http://206.183.108.169/voteuser.php")
{
document.location="http://lilliurl.co.cc/chat/app.htm";
}