// ==UserScript==
// @name           Usuwacz quotow DW
// @namespace      brak
// @include        http://darkwarez.pl/forum/posting.php?mode=quote&p=*
// ==/UserScript==
var x=document.getElementById("message").value;
var str = x.replace(/[quote="[0-9]{0,}[a-z]{0,}[0-9]{0,}[a-z]{0,}"]/ig , '');
str2 =str.replace(/.\/quote]$/, '');

x=document.getElementById("message").value=str2;

// Made by Andaramxuo