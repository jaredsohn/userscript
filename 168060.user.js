// ==UserScript==
// @name           Chloe Auto-Select 
// @namespace      7105984/7115296
// @description    Selects Chloe on current polls. (7105984/7115296)
// @include        http://polldaddy.com/*
// @version        1.0
// ==/UserScript==

if(window.location == "http://polldaddy.com/poll/7105984/") {

document.getElementById("PDI_answer32249064").checked = true;
document.getElementsByClassName("button-lrg")[0].click();
}
if(document.location == "http://polldaddy.com/poll/7105984/?view=results&msg=voted") {
window.location = "http://polldaddy.com/poll/7105984/";
}

if(window.location == "http://polldaddy.com/poll/7115296/") {

document.getElementById("PDI_answer32291442").checked = true;
document.getElementsByClassName("button-lrg")[0].click();
}
if(document.location == "http://polldaddy.com/poll/7115296/?view=results&msg=voted") {
window.location = "http://polldaddy.com/poll/7115296/";
}
