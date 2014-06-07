// ==UserScript==
// @name           Delete topic/post confirm
// @description    by Darth Brunus
// @version        1.0
// @include        http://uni2.playstarfleet.com/alliances/show/*
// @include        http://uni2.playstarfleet.com/topics/show/*
// @include        http://playstarfleet.com/alliances/show/*
// @include        http://playstarfleet.com/topics/show/*
// @include        http://playstarfleetextreme.com/alliances/show/*
// @include        http://playstarfleetextreme.com/topics/show/*
// @include        http://uni2.playstarfleetextreme.com/alliances/show/*
// @include        http://uni2.playstarfleetextreme.com/topics/show/*
// ==/UserScript==

var docLinks = document.getElementsByTagName("a");

for each(var aElem in docLinks) {
	if(aElem.textContent.toUpperCase() == "DELETE") {
		aElem.setAttribute("onclick", "if(confirm('Are you sure?')) { " + aElem.getAttribute("onclick") + " };");
	}
}