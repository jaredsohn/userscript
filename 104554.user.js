// ==UserScript==
// @name         Show bodyTable
// @version      1.00
// @namespace    http://userscripts.org/
// @homepage     http://userscripts.org/
// @description  Removes "display:none;" CSS from Salesforce page
// @author       suihanki
// ==/UserScript==

var replaceString = "";
var myOldString = document.getElementById("contentWrapper").innerHTML;
var myNewString = myOldString.replace("<style>#bodyTable{display:none;}</style>", replaceString);
document.getElementById("contentWrapper").innerHTML = myNewString;