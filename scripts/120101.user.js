// ==UserScript==
// @name           ytnewtab
// @namespace      http://www.youtube.de
// @include        http://www.youtube.de/*
// @include        http://www.youtube.com/*
// @include        http://www.youtube.*
// ==/UserScript==

// Searchbutton bearbeiten
var search = document.getElementById("search-btn");
if(search != null)
{
	search.setAttribute("onclick", "document.getElementById('masthead-search').target=\"\";"+search.getAttribute("onclick"));

	// Neuen Tabbutton kopieren und einstellen
	var button = search.cloneNode(false);
	button.innerHTML = "Tab";
	button.addEventListener('click',  function (evt) {evt.target.parentNode.setAttribute("target", "_blank");}, false);

	// Und hinzufügen
	var form = document.getElementById("masthead-search");
	form.insertBefore(button, form.childNodes[1]);
}

