// ==UserScript==
// @name           zzzz
// @description    KCzzz
// @include        http://*.facebook.*/kingdomsofcamelot/*
// ==/UserScript==

function $(x)
{
 return document.getElementById(x);
}

function appendbutton()
{
 $('modal_speedup').innerHTML += "<input type='button' value='AHAHAHAHA' onclick='modal_speedup_apply(\'bdg\',1,400434); return false;' />";
}

setTimeout(appendbutton, 5000);