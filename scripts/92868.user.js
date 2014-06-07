// ==UserScript==
// @name          Bilty Mail link
// @namespace     http://jeffpalm.com/biltymail
// @description   Adds a mail link to bilty pages
// @include       http://bit.ly/*
// ==/UserScript==

function main() {
  var js =
    "javascript:function findLinks(className) {var res=[];var as=document.getElementsByTagName('A');for (var i=0; i<as.length; i++) {var a=as[i];if (a.className==className) {res.push(a);}}return res;}function insertAfter(node,refNode) {refNode.parentNode.insertBefore(node,refNode);}function realMain() {var customizeLinks=findLinks('customize_button');for (var i=0; i<customizeLinks.length; i++) {var a=customizeLinks[i];a.innerHTML='C';}var copyLinks=findLinks('copy_button');for (var i=0; i<copyLinks.length; i++) {var a=copyLinks[i];var link=a.href;var space=document.createTextNode(' | ');var newA=document.createElement('A');newA.className=a.className;newA.innerHTML='M';newA.href='mailto:PERSON?subject=' + link + '&body=' + link;insertAfter(newA,a);insertAfter(space,a);a.innerHTML='CP';}}";
  js += ";realMain();void(0);";
  setTimeout('document.location = "' + js + '";',2000);
}

main();
