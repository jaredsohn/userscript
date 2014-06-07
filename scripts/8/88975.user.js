// ==UserScript==
// @name           Infinite Wars Login
// @namespace      Kicha
// @description      
// @include        http://www.infinite-wars.com/
// ==/UserScript==

var email = "";
var combination = "";

document.getElementById("MLogin").value = email;
document.getElementById("MPassword").value = combination;
document.querySelector('form[name="IWLogin"]').submit();

