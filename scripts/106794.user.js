// ==UserScript==
// @name           easy Web.de
// @namespace      web.de
// @description    Entfernt unnötiges auf der Web.de-Startseite
// @include        http://www.web.de
// ==/UserScript==

function hidewebde(){
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
}; 
document.getElementsByClassName("module").style.display = "block";
}
hidewebde();