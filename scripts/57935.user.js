// ==UserScript==
// @name           Remove Dnevnik.bg Comments
// @namespace      Other
// @include        http://*dnevnik.bg/*
// ==/UserScript==
 
( function() { 

var element = document.getElementsByTagName("div");

for(var i = 0; i < element.length; i++ ){
if(element[i].className == "comments")
while (element[i].firstChild) {
  element[i].removeChild(element[i].firstChild);}
}

for(var i = 0; i < element.length; i++ ){
if(element[i].className == "addCmnt")
while (element[i].firstChild) {
  element[i].removeChild(element[i].firstChild);}
}

for(var i = 0; i < element.length; i++ ){
if(element[i].className == "searchRssSubscr")
  element[i].parentNode.removeChild(element[i]);
}

})();