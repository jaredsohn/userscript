// ==UserScript==
// @name           AutoLogonToNOW
// @namespace      Nifty
// @description    Auto Logon To NOW
// @include        http://www.nowonline.in/NOWLBS/
// ==/UserScript==


function doOnLoad() {

var memberField = document.getElementsByName("sBroker")[0];
var userNameField = document.getElementsByName("AccountId")[0];
var passwordField = document.getElementsByName("Password")[0];

memberField.value = "111";
userNameField.value = "111";

passwordField.value = "111";
document.forms[0].submit();
}

document.addEventListener("DOMContentLoaded",doOnLoad,false);