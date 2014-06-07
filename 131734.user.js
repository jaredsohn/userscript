// ==UserScript==
// @name Print Last FM PlayLists
// @namespace tag:URI
// @Description	
// @include http://www.last.fm/music/*
// @include www.last.fm/music/*
// @include last.fm/music/*
// @include http://www.lastfm.*/music/*
// @include www.lastfm.*/music/*
// @include lastfm.*/music/*
// @exclude http://www.lastfm.*/music/*/+*
// @exclude www.lastfm.*/music/*/+*
// @exclude lastfm.*/music/*/+*
// @exclude http://www.last.fm/music/*/+*
// @exclude www.last.fm/music/*/+*
// @exclude last.fm/music/*/+*
// ==/UserScript==
if(document.body.getAttribute("class") == 'r-user a-overview lang-es') //check whether this page is an artist's page.
	isArtist = true;
	
GM_addStyle('#compatibility a {cursor:pointer;font-weight:bold;} #compatibility span.bar {  display: block ;    position: relative ;   margin: 5px 0 ;    width: 100% ;    height: 8px ;    overflow: hidden ;    -moz-border-radius: 3px ;    -webkit-border-radius: 3px ;    background: #ccc ;} #compatibility span.bar span {    display: block ;    height: 8px ;    -moz-border-radius: 3px ;    -webkit-border-radius: 3px ;}');
GM_addStyle('#compatibility span.verylow span {background: #9a9a9a;} #compatibility span.low span {    background: #453e45;} #compatibility span.medium span {    background: #5336bd;} #compatibility span.high span {    background: #05bd4c;} #compatibility span.veryhigh span {    background: #e9c102;} #compatibility span.super span {    background: #ff0101;}');

createButton();

function createButton(){
	var element, newElement, innerElement;
	element = document.getElementById('similarArtists');
	innerElement = document.createElement('a');
	if (element) {
	    newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p id="check_compat">Compare with: <select id="users_select" name="users"><option value="5" selected>5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option></select> users.</p></div>';
		innerElement.addEventListener("click", getUsers, true);
		innerElement.innerHTML = 'CHECK NOW';
		newElement.firstChild.appendChild(innerElement)
		element.parentNode.insertBefore(newElement, element);
	}
	else{
		var tracklist=xpath("//h2[@class='heading']");
		//element = document.getElementById('minifeedSmall');
		//alert('hola');
		newElement = document.createElement('div');
		newElement.innerHTML = '<div id="compatibility"><h2 class="heading"><span class="h2Wrapper">Compatibility</span></h2><p id="check_compat"></p></div>';
		innerElement.addEventListener("click", getUsers, true);
		innerElement.innerHTML = 'Check Compatibility';
		newElement.firstChild.appendChild(innerElement)
		tracklist.parentNode.insertBefore(newElement, tracklist);
	}	
}

function xpath(query) {
	return document.evaluate(query, document, null,9, null).singleNodeValue
}