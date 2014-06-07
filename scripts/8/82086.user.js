// ==UserScript==
// @name           Remove Facebook Referring Info
// @namespace      http://userscripts.org/scripts/show/82086
// @description    Automatically removes Facebook ref tag
// @version        1.3.2
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

function removeref(loc){
if (loc.indexOf('?ref=') >= 0){
return loc.substring(0, loc.indexOf('?ref='));}
else{
return loc;
}
}

var linksArr = document.links;
for(var i=0; i<linksArr.length; i++){
if (document.links[i].getAttribute("class") != "navMoreLess"){
  document.links[i].href = removeref(linksArr[i].href);}
if (document.links[i].getAttribute("onclick") == null){
  document.links[i].setAttribute("onclick","removepound()");}
  }
  
function removepound(){
var loc = window.location.href;

if (loc.indexOf('#!/') >= 0)
{
var pindex = loc.indexOf('#!/') + 3;
var loc2 = loc.substring(pindex,loc.length);
loc = loc.substring(0, loc.indexOf('.com/')+5);
loc = loc + loc2;
window.location.href = loc;
}}