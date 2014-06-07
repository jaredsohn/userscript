// ==UserScript==
// @name          Kongregate badge-browser+
// @description   The Kongregate badge browser will renember your filter and order when you switch to another category.
// @include       http://www.kongregate.com/badges?*
// ==/UserScript==
var i, params, aparams = [], gparams = location.toString().split("?")[1].split("&");
for(i=0;i<gparams.length;i++)
if((/^(filter_by=)|(sort=)/).test(gparams[i]))
aparams.push(gparams[i]);
if(!aparams.length) return;
params = aparams.join("&");
document.getElementById("browser-sidebar-all-badges").getElementsByTagName("a")[0].href += "?"+params;
for(i=1;i<=9;i++) {
if(i == 4) continue;
document.getElementById("browser-sidebar-categories-"+i).getElementsByTagName("a")[0].href += "&"+params;
}