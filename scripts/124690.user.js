// ==UserScript==
// @name           ikaki
// @namespace      ikariam.ru
// @include        http://s*.*.ikariam.com/*
// ==/UserScript==

//var asp = document.getElementById(value_wood);
var asp_wood = document.getElementById('value_wood').innerHTML;
var asp_wine = document.getElementById('value_wine').innerHTML;
var asp_marble = document.getElementById('value_marble').innerHTML;
var asp_crystal = document.getElementById('value_crystal').innerHTML;
var asp_sulfur = document.getElementById('value_sulfur').innerHTML;

var f1 = /\D/g;
var asp_wood2 = asp_wood.replace(f1, "");
var asp_wine2 = asp_wine.replace(f1, "");
var asp_marble2 = asp_marble.replace(f1, "");
var asp_crystal2 = asp_crystal.replace(f1, "");
var asp_sulfur2 = asp_sulfur.replace(f1, "");
var asp_wood3 = parseInt(asp_wood2);
 var asp_wine3 = parseInt(asp_wine2);
var asp_marble3 = parseInt(asp_marble2);
var asp_crystal3 = parseInt(asp_crystal2);
var asp_sulfur3 = parseInt(asp_sulfur2);
var asp_all = (asp_wood3+asp_wine3+asp_marble3+asp_crystal3+asp_sulfur3);

asp_all_but = "<div class='centerButton' style='position:absolute; background: #f6ebbc; top:144px; left:521px; height:13px; width:90px; border:1px solid #c9a584; opacity: 1.0; z-index:11'>"+
"<span style='color:#663300; font-size:12px;'> = "+asp_all+"</span>"+
"</div>";
var asp_all_but2 = document.createElement("div");
asp_all_but2.innerHTML = asp_all_but;
document.body.insertBefore(asp_all_but2, document.body.firstChild);

//alert (asp_all);
