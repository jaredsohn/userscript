// ==UserScript==
// @name          Z-music shuffler
// @namespace     http://youngpup.net/userscripts
// @description	  Loads all search pages and shuffles. Warning! You need to reload the search result page to make it work.
// @include       http://z-music.org/*
// @include       http://www.z-music.org/*
// @include       http://z-music.ru/*
// @include       http://www.z-music.ru/*
// ==/UserScript==


function listener(e){
	//alert(e.target.innerHTML + " " + i);
	if(document.querySelector("div.pagination a").innerHTML == "Load more tracks"){
		if(document.querySelector("div.warning") == null){
			document.querySelector("div.pagination a").click();
		}else{
			document.querySelector("#playlist").removeEventListener("DOMNodeInserted", listener);
			document.querySelector("a.shuffle").click();
		}
	}

}

window.addEventListener("load", function(e) {
		document.querySelector("div.pagination a").click();
		document.querySelector("#playlist").addEventListener("DOMNodeInserted", listener);
}, false);

