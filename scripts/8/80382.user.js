// ==UserScript==
// @name           Auto-Redeem Lockerz Chrome
// @namespace      ss
// @description    sss
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/*
// ==/UserScript==

javascript: var c= "Brazil"
var deee= "BR";
var pais = "Brazil";

document.forms[0].elements[0].value = "Romulo";
document.forms[0].elements[1].value = "Macedo";
document.forms[0].elements[2].value = "Csb 5 Lote 8 Ed Munich Apt 806";
document.forms[0].elements[3].value = "Taguatinga Sul";
document.forms[0].elements[4].value = "Taguatinga";
document.forms[0].elements[5].value = "DF";
document.forms[0].elements[6].value = "72015555";
document.forms[0].elements[10].value = "6199173001";

document.getElementById("c_11121").value = pais;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
document.getElementById("_countryDetails").value = pais;
window.location= "javascript: manipulateForm('"+deee+"');";void(0)