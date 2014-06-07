// ==UserScript==
// @name           Login name focus
// @namespace      http://www.edazzle.net/
// @description    Focus input on the login name textfield
// @include	       * 	
// @version 	   0.2
// ==/UserScript==

/*
 
 Focuses the login username field when there is username/password fields
 or just password field when only password field; removes any text which
 may be already in username field; adds domain name to title of page if
 no identifying website name is shown. Useful if used with KeePass AutoType.
 
 Works with Greasemonkey, Trixie (http://www.bhelpuri.net/Trixie/) and Opera
 
 isCntrlInVP function adapted from KeePass AutoType Enhancer by JC2k8

 Versions:
           0.1 Initial release
           0.2 Work around for some login forms; only focus login form when in viewport; cross browser compatibility workarounds

*/

//var onlyInsideVP=true

function isCtrlInVP(elm) {
var delta, cTop = 0, cLeft = 0;
//if (!onlyInsideVP) return true;
delta = [document.body.scrollTop, document.body.scrollLeft];
do {
cTop  += elm.offsetTop;
cLeft += elm.offsetLeft;
elm   = elm.offsetParent;
} while (elm);
if (document.body.clientWidth > 1000) {var width = document.body.clientWidth-310} else {var width = document.body.clientWidth};
if (document.body.clientHeight > 40000) {var height = document.body.clientHeight-48752} else {var height = document.body.clientHeight};
return (cTop > delta[0] && cTop < delta[0] + height && cLeft > delta[1] && cLeft < delta[1] + width);
}

function main() {
var changeTitle=false;
var removeExistingText=true;

var form = document.getElementsByTagName("form");
var regex=/[a-zA-Z0-9\s\S\d\D\w\W]/gi;

for (var x=0;x<form.length;x++) {
var input = form[x].getElementsByTagName("input");
var array = new Array();
for (var y=0;y<input.length;y++) {
if (input[y].type=="password" || input[y].type=="text") {
array.push(input[y]);
}
}
if (array.length==2 && array[1].type=="password" && isCtrlInVP(array[1]) || array.length==1 && array[0].type=="password" && isCtrlInVP(array[0])) {
array[0].focus();
if (regex.test(array[0].value) && removeExistingText) {
array[0].value="";
}
if (changeTitle) {
if (document.title) {
var domain = document.domain.replace(/[a-zA-Z0-9\s\S\d\D\w\W]+?\./i,"");
var domainReg = new RegExp(domain,"i");
var domainTitle = domain.replace(/\.[a-zA-Z0-9\s\S\d\D\w\W]+/gi,"")
var domainTitleReg = new RegExp(domainTitle,"gi")
if (!domainReg.test(document.title) && !domainTitleReg.test(document.title)) {
document.title = document.title+" : "+domain;
} 
} else {
document.title=domain;
}
}
}
}
}

if (window.attachEvent) {
window.attachEvent("onload",main);
} else {
window.addEventListener("load",main,false);
}