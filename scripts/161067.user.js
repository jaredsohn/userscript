// ==UserScript==
// @name Message History
// @namespace Psyduck
// @description Adds a link to your message history on the menu bar.
// @include http://endoftheinter.net/*
// @include http://*.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://*.endoftheinter.net/*
// ==/UserScript==

prefix = parent.location.protocol;

function insertAfter(newNode, target)
{
var parent = target.parentNode;
var refChild = target.nextSibling;
if(refChild != null)
parent.insertBefore(newNode, refChild);
else
parent.appendChild(newNode);
};

var a=document.getElementsByTagName("a");
for (var i=0; i<a.length; i++)
{
if (a[i].innerHTML=="Home")
{
var m=document.createElement("a");
m.href=prefix+"//boards.endoftheinter.net/history.php";
m.textContent ="Message History";
insertAfter(m, a[i]);

//add the spacer so it doesn't look ugly

var l = document.createTextNode(" | ");
insertAfter(l, a[i]);
break;
}
}