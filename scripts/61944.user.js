// ==UserScript==
// @name          LWM war on full screen
// @homepage      http://usersripts.org/
// @description   LWM war on full screen
// @include       http://www.lordswm.com/*
// @include       http://lordswm.com/*
// ==/UserScript==

function addteg()
{
var str="<option>"+"бла бла бла"+"</option>";
document.getElementById("TEGS").outerHTML="<select id=\"TEGS\" size=\"1\">"+str+"</select>";
} 