// ==UserScript==
// @name           ankur
// @namespace      ankr
// @include        http://polldaddy.com/*
// ==/UserScript==

if(window.location == "http://polldaddy.com/poll/5777843/") {

document.getElementById("PDI_answer26177406").checked = true;
document.getElementsByClassName("button-lrg")[0].click();
}
if(document.location == "http://polldaddy.com/poll/5777843/?view=results&msg=voted") {
window.location = "http://polldaddy.com/poll/5777843/";
}