// ==UserScript==
// @name           d2wissen anchor fix
// @namespace      http://userscripts.org/users/161003
// @description    d2wissen anchor fix
// @include        http://d2wissen.d2chars.de/*
// @copyright      Nope
// ==/UserScript==

(function() {
var as = document.evaluate("//a[(not(contains(@href, '#')))][(not(contains(@href, 'html')))]",document,null,6,null);
var spans = document.evaluate("//i",document,null,6,null);
for(var i=0; i<spans.snapshotLength; i++){
if(as.snapshotItem(i).parentNode.nodeName == "CENTER") {
as.snapshotItem(i).parentNode.removeChild(as.snapshotItem(i));
if(i>0)spans.snapshotItem(i-1).appendChild(as.snapshotItem(i));
}
}
//if(window.location.href.indexOf('#') > -1) {
//window.location.href = window.location.href;
//}
})();