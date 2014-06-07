// ==UserScript==
// @name           Show full size photo links in Google Plus albums
// @namespace      http://userscripts.org/users/62169
// @include        https://plus.google.com/*
// @include        http://plus.google.com/*
// ==/UserScript==

var dropDown = document.getElementById('gbd5').childNodes[0];
dropDown.innerHTML += '<li class=gbmtc><div class="gbmt gbmh"></div></li>';
var fullSizeButtonLi = document.createElement("li");
fullSizeButtonLi.className = "gbkc gbmtc";
var fullSizeButton = document.createElement("a");
fullSizeButton.addEventListener("click", 
	function(){
		var photos = document.getElementsByClassName("ea-g-Vc-pa");
		if (photos.length == 0) {
			alert("No photos found on this page.");
			return;
		}
		var results = "";
		for (var i = 0; i < photos.length; i++) {
			var photoURL = photos[i].src.split("/");
			photoURL[photoURL.length - 2] = "h48";
			results += "<img src='" + photoURL.join("/") + "' style='vertical-align: middle; margin: 4px;'/>";
			photoURL[photoURL.length - 2] = "d";
			results += "<a href='" + photoURL.join("/") + "'>" + photoURL.join("/") + "</a><br />";
		}
		setTimeout(function() {
			GM_openInTab("data:text/html;charset=UTF-8," + encodeURI(results));
		}, 0);
		return false;
	}, false);
fullSizeButton.className = "gbmt";
fullSizeButton.innerHTML = "Full size photos";
fullSizeButtonLi.appendChild(fullSizeButton);
dropDown.appendChild(fullSizeButtonLi);
