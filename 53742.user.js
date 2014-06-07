// ==UserScript==
// @name           WhatTheMovie - Filter Overview
// @namespace      http://userscripts.org/users/99643
// @include        http://whatthemovie.com/overview/*
// @description    gives options to filter the overview page at whatthemovie.com
// ==/UserScript==

var link0 = document.createElement("a");
link0.innerHTML = "show all";
link0.href = "#";
link0.addEventListener('click',function () {
	GM_setValue("ShowOption",0);
	location.reload();
},false);
var li0 = document.createElement("li");
li0.appendChild(link0);

var link1 = document.createElement("a");
link1.innerHTML = "show solved";
link1.href = "#";
link1.addEventListener('click',function () {
	GM_setValue("ShowOption",1);
	location.reload();
},false);
var li1 = document.createElement("li");
li1.appendChild(link1);

var link2 = document.createElement("a");
link2.innerHTML = "show unsolved";
link2.href = "#";
link2.addEventListener('click',function () {
	GM_setValue("ShowOption",2);
	location.reload();
},false);
var li2 = document.createElement("li");
li2.appendChild(link2);


var nav = document.getElementsByClassName("nav_shots");
var value = GM_getValue("ShowOption",0);

//value == 0 => no filtering
//value == 1 => only show solved shots
//value == 2 => only show unsolved shots
if(value == 0){
	//do not filter, but show option to filter
	nav[0].appendChild(li1);
	nav[0].appendChild(li2);
}else if(value == 1){
	nav[0].appendChild(li0);
	nav[0].appendChild(li2);
	//filter shots to only show solved shots
	var shots = document.evaluate("//ul[@class='small_shots']/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < shots.snapshotLength; i++) {
		var shot = shots.snapshotItem(i);
		if(shot.getAttribute("class") != "solved"){
			shot.parentNode.removeChild(shot);
		}
	}
}else if(value == 2){
	nav[0].appendChild(li0);
	nav[0].appendChild(li1);
	//filter shots to only show unsolved shots
	var shots = document.getElementsByClassName("solved");
	for (var i = 0; i < shots.length; i+0) {
		var shot = shots[i];
		shot.parentNode.removeChild(shot);
	}
}