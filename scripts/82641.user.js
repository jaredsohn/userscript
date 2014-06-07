// ==UserScript==
// @name           Auto-Redeem Lockerz Chrome2
// @namespace      fdbdhbdsgb
// @description    dfhbntn fdntgdmn g gfb 
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/*
// ==/UserScript==

javascript: var c= "Italy"
var deee= "IT";
var pais = "Italy";

document.forms[0].elements[0].value = "Davide";
document.forms[0].elements[1].value = "Gaio";

document.getElementById("c_11121").value = pais;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
document.getElementById("_countryDetails").value = pais;
window.location= "javascript: manipulateForm('"+deee+"');";void(0)