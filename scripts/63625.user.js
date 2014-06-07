// ==UserScript==
// @name           Compass login
// @namespace      Rob
// @include https://compass.illinois.edu/webct/logonDisplay.dowebct
// ==/UserScript==

var netid = ""; // <-- you should enter your netid here

var form = document.forms[0];
form.action = "/webct/logonDisplay.dowebct";
form.submit();

var inputbox = document.getElementsByName("webctid");
inputbox[0].value = netid; //

var inputs = document.getElementsByClassName("loginButton");
var submit = inputs[0];
submit.click();