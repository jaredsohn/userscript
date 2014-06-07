// ==UserScript==
// @name           SWC Offloader
// @namespace      null
// @description    Mass-Selection button added to Position manager in the Star Wars Combine
// @include        http://www.swcombine.com/members/position/index.php*
// @include        http://www.swcombine.com/members/position/?*
// ==/UserScript==
var x = document.getElementsByName('entity[]');
if (x.length > 0) {
var th=document.evaluate("//select[@name='subaction']",document,null,9,null).singleNodeValue,
	box=document.createElement("input");
box.type = "button";
box.name = "massclick";
box.value = "Mass Select";
box.addEventListener("click", function() {
var x = document.getElementsByName('entity[]');
var sel = prompt("How many NPC's do you want to select? (Max: "+x.length+")",x.length);
if (sel == null) { return; }
if (sel > x.length) { sel = x.length; }
for (var i=0;i < sel;i++ ) {
  x[i].checked = true;
}
},false);
th.parentNode.insertBefore(box, th.nextSibling);
}