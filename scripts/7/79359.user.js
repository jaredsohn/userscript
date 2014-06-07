// ==UserScript==
// @name           Auto-Redeem Lockerz Chrome
// @namespace      ss
// @description    sss
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/*
// ==/UserScript==

javascript: var c= "Colombia"
var deee= "CO";
var pais = "Colombia";

document.forms[0].elements[0].value = "mi nombre";
document.forms[0].elements[1].value = "mi apellido";
document.forms[0].elements[2].value = "dire1";
document.forms[0].elements[3].value = "dire2";
document.forms[0].elements[4].value = "ciudad";
document.forms[0].elements[5].value = "estado";
document.forms[0].elements[6].value = "codigo Postal";
document.forms[0].elements[10].value = "tel";

document.getElementById("c_11121").value = pais;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
document.getElementById("_countryDetails").value = pais;
window.location= "javascript: manipulateForm('"+deee+"');";void(0)
