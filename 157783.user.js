// ==UserScript==
// @name        Kicktraq Link on Kickstarter Projects
// @namespace   http://www.frog23.net
// @description Adds a link to kicktraq on the projectpages on kickstarter
// @include     http://www.kickstarter.com/projects/*
// @include     https://www.kickstarter.com/projects/*
// @version     1.1
// ==/UserScript==

var navi = document.getElementById("running-board-nav");
if(navi){
	var listItem = document.createElement("li");
	listItem.innerHTML = "<a href=\"http://www.kicktraq.com/search/?find="+window.location+"\">Kicktraq</a>"
	navi.appendChild(listItem);
}