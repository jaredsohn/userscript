// ==UserScript==
// @name           hideSearch
// @namespace      tmb
// @description    button to hide/show search options
// @include        https://themixingbowl.org/torrent/*
// @include        https://tmb.dj/torrent/*
// ==/UserScript==

// stolen insertAfter function
function insertAfter( referenceNode, newNode ){
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// toggle boolean GM property
function GM_toggle(property){
	var value = GM_getValue(property, false);
	value = (value == true) ? false : true;
	GM_setValue(property, value);
}

//completely hides an element
function hideSearch(){
	var srch = document.getElementById("taggrid");
	if(srch == null) srch = document.getElementById("tag");
	if(GM_getValue("tmbDisImg", false)){
		srch.style.display = "none";
	}
	else{
		srch.style.display = "";
	}
}

//draws a button with a click event listener
function renderUI(){
	var ui = document.getElementById("taggrid")
	if(ui == null) ui = document.getElementById("tag")

	var button = document.createElement("button");
	button.textContent = "X";
	button.addEventListener("click", function(){ GM_toggle("tmbDisImg"); } , false);
	insertAfter(ui, button);
}

renderUI();
hideSearch();