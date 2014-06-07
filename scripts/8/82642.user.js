// ==UserScript==
// @name           Auto-Redeem Lockerz Chrome22
// @namespace      srjnhnnjn
// @description    asndgntgehnbtednhfdsbhnzd
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/*
// ==/UserScript==

javascript: var c= "Italy"
var deee= "IT";
var pais = "Italy";

document.forms[0].elements[2].value = "Via Julia 12/B";
document.forms[0].elements[3].value = "";
document.forms[0].elements[4].value = "Romano d'Ezzelino";
document.forms[0].elements[5].value = "VI";
document.forms[0].elements[6].value = "36060";
document.forms[0].elements[10].value = "3484197264";

document.getElementById("c_11121").value = pais;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
document.getElementById("_countryDetails").value = pais;
window.location= "javascript: manipulateForm('"+deee+"');";void(0)