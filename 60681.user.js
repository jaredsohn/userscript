// ==UserScript==
// @name           ImhoNet - Kinobaza.tv
// @namespace      http://userscripts.org/users/114740
// @include        http://films.imhonet.ru/element/*/
// ==/UserScript== 

var line=document.title
var firstline=line.split(" \(", 1);
var reg=/ \(.+\)/
var result=''+reg.exec(line)
var d=result.length
var secondline=result.substring(2,d-1)

var insertstring='<img src="http://kinobaza.reformal.ru/files/images/resize/12300909495696.gif" valign=middle style="padding-right:6px" width="25"><a href="http://kinobaza.tv/search?query=' +firstline+ '">искать русское название</a>, <a href="http://kinobaza.tv/search?query=' +secondline+ '">английское название</a><br>';

var l=document.getElementById("MainInfoSmallDescription").textContent
document.getElementById("MainInfoSmallDescription").innerHTML = insertstring+l