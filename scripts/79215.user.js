// ==UserScript==
// @name			Fix IGN Video Embed Markup Area
// @namespace		vestitools.pbworks.com
// @description		Fixes the "More" link in the embed area of IGN videos so you can access the [ignvideo] embed markup
// @include			http://*.ign.com*/videos/*
// @exclude			http://boards.ign.com/*
// @version			1.0.0
// ==/UserScript==

//Covered by GPL v3

var link = document.getElementById("share-more");
var div = link.parentNode.getElementsByClassName("share-more-div")[0];
var input = document.getElementById("embedIGN");

if(link && div && input) {
	
	//weird ass bug:  go to a video page and refresh twice.
	//input.value will be a link that we don't want, and is the value that's visible on the page.
	//input.getAttribute("value") is still the markup that we want.
	//so fix this, just in case
	if(input.value != input.getAttribute("value"))
		input.value = input.getAttribute("value");
		
	//refreshing once will break the reguler embed link as well,
	//but this script doesn't care about that
	
	function defined(something) {
		
		return typeof something != "undefined";
		
		}
	
	//for maximum browser support...
	
	function getTextContent(el) {
		
		if(!el) return null;
		
		if(defined(el.textContent)) return el.textContent;
		if(defined(el.innerText)) return el.innerText;
		if(defined(el.innerHTML)) return el.innerHTML;
		
		return null;
		
		}
		
	function setTextContent(el, text) {
		
		if(!el) return null;
		
		if(defined(el.textContent)) return el.textContent = text;
		if(defined(el.innerText)) return el.innerText = text;
		if(defined(el.innerHTML)) return el.innerHTML = text;
		
		return null;
		
		}
	
	link.addEventListener("click", function(e) {
		
		var tc = getTextContent(link);
		if(tc===null) return;
		
		var showMore = tc == "More";
		
		setTextContent(link, showMore ? "Less" : "More");
		div.style.display = showMore ? "block" : "none";
		
		e.preventDefault();
		
		}, true);
	
	}